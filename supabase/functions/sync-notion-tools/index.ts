import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-secret',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Secret-based authorization check
  const authHeader = req.headers.get('x-webhook-secret');
  const expectedSecret = Deno.env.get('WEBHOOK_SECRET');
  
  if (!expectedSecret) {
    console.error('WEBHOOK_SECRET environment variable is not set');
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Server configuration error' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }

  if (authHeader !== expectedSecret) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Unauthorized' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401 
      }
    );
  }

  try {
    const notionApiKey = Deno.env.get('NOTION_API_KEY');
    const notionDatabaseId = Deno.env.get('NOTION_DATABASE_ID');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!notionApiKey || !notionDatabaseId) {
      throw new Error('Missing Notion credentials');
    }

    console.log('Fetching tools from Notion database:', notionDatabaseId);

    // Récupérer les données de Notion
    const notionResponse = await fetch(
      `https://api.notion.com/v1/databases/${notionDatabaseId}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${notionApiKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }
    );

    if (!notionResponse.ok) {
      const errorText = await notionResponse.text();
      console.error('Notion API error:', notionResponse.status, errorText);
      throw new Error(`Notion API error: ${notionResponse.status} - ${errorText}`);
    }

    const notionData = await notionResponse.json();
    console.log(`Found ${notionData.results.length} tools in Notion`);

    // Mapper les données Notion vers le schéma Supabase
    const tools = notionData.results.map((page: any) => {
      const props = page.properties;
      
      // Helper function to safely extract text from Notion properties
      const getText = (prop: any) => prop?.rich_text?.[0]?.plain_text || prop?.title?.[0]?.plain_text || '';
      const getSelect = (prop: any) => prop?.select?.name || '';
      const getUrl = (prop: any) => prop?.url || null;
      
      return {
        name: getText(props.Name) || getText(props.name),
        description: getText(props.Description) || getText(props.description) || '',
        tool_type: getSelect(props.Type) || getSelect(props.type) || '',
        category: getSelect(props.Category) || getSelect(props.category) || '',
        url: getUrl(props.URL) || getUrl(props.url),
        logo_url: getUrl(props['Logo URL']) || getUrl(props.logo_url),
        referral_link: getUrl(props['Referral Link']) || getUrl(props.referral_link),
        feedback: getText(props.Feedback) || getText(props.feedback) || null,
      };
    }).filter((tool: any) => tool.name); // Filtrer les entrées sans nom

    console.log(`Mapped ${tools.length} valid tools from Notion`);

    // Créer le client Supabase
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Upsert dans Supabase (insertion ou mise à jour basée sur le nom)
    const { data, error } = await supabase
      .from('tools')
      .upsert(tools, { 
        onConflict: 'name',
        ignoreDuplicates: false 
      });

    if (error) {
      console.error('Supabase upsert error:', error);
      throw error;
    }

    console.log(`Successfully synced ${tools.length} tools to Supabase`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        synced: tools.length,
        message: `Successfully synced ${tools.length} tools from Notion to Supabase`,
        tools: tools.map((t: any) => ({ name: t.name, type: t.tool_type }))
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Sync error:', error);
    // Don't expose stack traces in response - errors are logged server-side
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
