/**
 * Example usage of ContextualZoom component
 * 
 * This demonstrates the "zooming that changes context" concept:
 * - Zoom out: See months/years
 * - Zoom in: See days/weeks
 * - Zoom in more: See hours/details
 */

import React from "react";
import { ContextualZoom, ZoomLevel } from "./ContextualZoom";
import { Calendar, MapPin, Users, BarChart } from "lucide-react";

// Example 1: Calendar zoom (days → weeks → months → years)
export const CalendarZoomExample = () => {
  const levels: ZoomLevel[] = [
    {
      level: 0,
      label: "Years",
      threshold: 0,
      content: (
        <div className="text-center space-y-4">
          <div className="text-6xl font-bold text-accent">2024</div>
          <div className="text-6xl font-bold text-accent">2025</div>
          <div className="text-6xl font-bold text-accent">2026</div>
          <p className="text-muted-foreground">Zoom in to see months</p>
        </div>
      ),
    },
    {
      level: 1,
      label: "Months",
      threshold: 0.25,
      content: (
        <div className="grid grid-cols-3 gap-4">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
            (month) => (
              <div
                key={month}
                className="p-4 bg-card rounded-lg border border-border text-center hover:border-accent/30 transition-colors"
              >
                <div className="text-2xl font-bold">{month}</div>
              </div>
            )
          )}
        </div>
      ),
    },
    {
      level: 2,
      label: "Weeks",
      threshold: 0.5,
      content: (
        <div className="grid grid-cols-7 gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground mb-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 28 }, (_, i) => (
            <div
              key={i}
              className="p-3 bg-card rounded-lg border border-border text-center hover:border-accent/30 transition-colors"
            >
              <div className="text-sm font-medium">{i + 1}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      level: 3,
      label: "Days",
      threshold: 0.75,
      content: (
        <div className="w-full max-w-2xl space-y-4">
          <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-bold">Today's Schedule</h3>
            </div>
            <div className="space-y-3">
              {[
                { time: "09:00", event: "Team Standup" },
                { time: "11:00", event: "Product Review" },
                { time: "14:00", event: "User Interview" },
                { time: "16:00", event: "Sprint Planning" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="text-sm font-medium text-accent w-16">{item.time}</div>
                  <div className="flex-1 text-foreground">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold mb-2">Calendar Zoom Example</h3>
        <p className="text-sm text-muted-foreground">
          Zoom out to see years, zoom in to see months, weeks, and daily schedules
        </p>
      </div>
      <ContextualZoom levels={levels} initialZoom={0.5} height="500px" />
    </div>
  );
};

// Example 2: Map zoom (city → streets → shops → reviews)
export const MapZoomExample = () => {
  const levels: ZoomLevel[] = [
    {
      level: 0,
      label: "City View",
      threshold: 0,
      content: (
        <div className="text-center space-y-4">
          <MapPin className="w-16 h-16 text-accent mx-auto" />
          <div className="text-4xl font-bold">Paris</div>
          <div className="text-2xl text-muted-foreground">France</div>
          <p className="text-muted-foreground">Zoom in to see districts</p>
        </div>
      ),
    },
    {
      level: 1,
      label: "Districts",
      threshold: 0.3,
      content: (
        <div className="grid grid-cols-3 gap-4">
          {["Le Marais", "Montmartre", "Latin Quarter", "Champs-Élysées", "Bastille", "Belleville"].map(
            (district) => (
              <div
                key={district}
                className="p-4 bg-card rounded-lg border border-border text-center hover:border-accent/30 transition-colors"
              >
                <div className="text-lg font-semibold">{district}</div>
              </div>
            )
          )}
        </div>
      ),
    },
    {
      level: 2,
      label: "Streets",
      threshold: 0.6,
      content: (
        <div className="w-full max-w-2xl space-y-3">
          <div className="p-4 bg-card rounded-lg border border-border">
            <div className="font-semibold mb-2">Rue de Rivoli</div>
            <div className="text-sm text-muted-foreground">Multiple shops and restaurants</div>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border">
            <div className="font-semibold mb-2">Boulevard Saint-Germain</div>
            <div className="text-sm text-muted-foreground">Cafés and boutiques</div>
          </div>
        </div>
      ),
    },
    {
      level: 3,
      label: "Shop Details",
      threshold: 0.85,
      content: (
        <div className="w-full max-w-md space-y-4">
          <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Le Comptoir du Relais</h3>
                <p className="text-sm text-muted-foreground">Restaurant • French Cuisine</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">★★★★☆</span>
                <span className="text-sm text-muted-foreground">4.2 (127 reviews)</span>
              </div>
              <p className="text-sm text-foreground">
                "Excellent bistro with authentic French dishes. The duck confit is outstanding!"
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold mb-2">Map Zoom Example</h3>
        <p className="text-sm text-muted-foreground">
          Zoom in from city view to districts, streets, and individual shop details with reviews
        </p>
      </div>
      <ContextualZoom levels={levels} initialZoom={0.3} height="500px" />
    </div>
  );
};

// Example 3: Product metrics zoom (overview → categories → details)
export const MetricsZoomExample = () => {
  const levels: ZoomLevel[] = [
    {
      level: 0,
      label: "Overview",
      threshold: 0,
      content: (
        <div className="text-center space-y-6">
          <BarChart className="w-20 h-20 text-accent mx-auto" />
          <div className="text-5xl font-bold text-accent">1.2M</div>
          <div className="text-2xl text-muted-foreground">Total Users</div>
          <p className="text-muted-foreground">Zoom in to see breakdown</p>
        </div>
      ),
    },
    {
      level: 1,
      label: "Categories",
      threshold: 0.33,
      content: (
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: "Active Users", value: "850K", icon: Users },
            { label: "New Users", value: "120K", icon: Users },
            { label: "Retention", value: "72%", icon: BarChart },
            { label: "Engagement", value: "4.2h", icon: BarChart },
          ].map((metric, i) => (
            <div
              key={i}
              className="p-6 bg-card rounded-xl border border-border text-center hover:border-accent/30 transition-colors"
            >
              <metric.icon className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      level: 2,
      label: "Details",
      threshold: 0.66,
      content: (
        <div className="w-full max-w-2xl space-y-4">
          <div className="p-6 bg-card rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-4">User Activity Breakdown</h3>
            <div className="space-y-3">
              {[
                { label: "Daily Active Users", value: "450K", percentage: 75 },
                { label: "Weekly Active Users", value: "680K", percentage: 80 },
                { label: "Monthly Active Users", value: "850K", percentage: 85 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold mb-2">Metrics Zoom Example</h3>
        <p className="text-sm text-muted-foreground">
          Zoom from high-level metrics to detailed breakdowns and analytics
        </p>
      </div>
      <ContextualZoom levels={levels} initialZoom={0.33} height="500px" />
    </div>
  );
};

