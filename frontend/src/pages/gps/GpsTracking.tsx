import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { IconMapPin, IconNavigation, IconUsers, IconClock, IconCircleFilled, IconRefresh } from '@tabler/icons-react';

const mapColors: Record<string, string> = {
  'Bangalore South': '#7c3aed',
  'Bangalore North': '#6d28d9',
  'Ahmedabad West': '#0369a1',
  'Delhi Central': '#dc2626',
  'Hyderabad West': '#d97706',
  'Chennai South': '#059669',
};

function getSalesmanMapPos(territory: string): { x: number; y: number } {
  const positions: Record<string, { x: number; y: number }> = {
    'Bangalore South': { x: 30, y: 65 },
    'Bangalore North': { x: 32, y: 58 },
    'Ahmedabad West': { x: 24, y: 38 },
    'Delhi Central': { x: 42, y: 22 },
    'Hyderabad West': { x: 46, y: 58 },
    'Chennai South': { x: 48, y: 72 },
  };
  return positions[territory] || { x: 50, y: 50 };
}

export default function GpsTracking() {
  const { salesmen } = useAppStore();
  const [selectedId, setSelectedId] = useState<string | null>(salesmen[0]?.id || null);
  const [lastRefresh] = useState(new Date().toLocaleTimeString());

  const selected = salesmen.find((s) => s.id === selectedId);
  const active = salesmen.filter((s) => s.status === 'Active');
  const totalDistance = 87.4;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Active Salesmen', value: active.length, icon: IconUsers, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Total Distance', value: `${totalDistance} km`, icon: IconNavigation, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Total Visits', value: salesmen.reduce((s, sm) => s + sm.todayVisits, 0), icon: IconMapPin, bg: 'bg-violet-50', color: 'text-violet-600' },
          { label: 'Last Update', value: lastRefresh, icon: IconClock, bg: 'bg-amber-50', color: 'text-amber-600' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border border-border shadow-sm">
              <CardContent className={`p-4 ${s.bg}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-heading font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                  </div>
                  <Icon size={20} className={s.color} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Salesman list */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-semibold flex items-center justify-between">
              Field Team
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                <IconRefresh size={14} />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 space-y-1">
            {salesmen.map((sm) => {
              const color = mapColors[sm.territory] || '#6d28d9';
              return (
                <button
                  key={sm.id}
                  onClick={() => setSelectedId(sm.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                    selectedId === sm.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: color }}>
                      {sm.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    {sm.status === 'Active' && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{sm.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{sm.territory}</p>
                    <p className="text-[10px] text-muted-foreground">{sm.lastSeen}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-foreground">{sm.todayVisits}</p>
                    <p className="text-[10px] text-muted-foreground">visits</p>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Map */}
        <Card className="lg:col-span-3 border border-border shadow-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
              <IconMapPin size={16} className="text-primary" />
              Live Map — India Sales Coverage
              <Badge className="ml-auto bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs">
                <IconCircleFilled size={7} className="mr-1 animate-pulse-slow" /> Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full" style={{ paddingBottom: '55%' }}>
              {/* India map SVG background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 overflow-hidden">
                {/* Grid lines */}
                {[20, 40, 60, 80].map((x) => (
                  <div key={`v${x}`} className="absolute top-0 bottom-0 border-l border-blue-100/60" style={{ left: `${x}%` }} />
                ))}
                {[25, 50, 75].map((y) => (
                  <div key={`h${y}`} className="absolute left-0 right-0 border-t border-blue-100/60" style={{ top: `${y}%` }} />
                ))}

                {/* India outline (simplified) */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="25,10 45,10 55,15 65,20 75,35 72,55 65,70 58,82 45,92 35,85 25,78 18,65 16,50 18,35 20,22" fill="hsl(82 28% 50%)" stroke="hsl(82 35% 38%)" strokeWidth="0.5" />
                </svg>

                {/* Territory zones */}
                {salesmen.map((sm) => {
                  const pos = getSalesmanMapPos(sm.territory);
                  const color = mapColors[sm.territory] || '#6d28d9';
                  const isSelected = sm.id === selectedId;
                  return (
                    <div key={sm.id}>
                      {/* Pulse ring */}
                      {sm.status === 'Active' && (
                        <div
                          className="absolute rounded-full animate-ping opacity-30"
                          style={{
                            left: `${pos.x}%`, top: `${pos.y}%`,
                            transform: 'translate(-50%, -50%)',
                            width: isSelected ? 40 : 24,
                            height: isSelected ? 40 : 24,
                            backgroundColor: color,
                          }}
                        />
                      )}
                      {/* Marker */}
                      <button
                        onClick={() => setSelectedId(sm.id)}
                        className="absolute flex flex-col items-center group"
                        style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -100%)' }}
                      >
                        <div
                          className={`flex items-center justify-center rounded-full text-white text-[10px] font-bold shadow-lg transition-all ${isSelected ? 'ring-2 ring-white ring-offset-1' : ''}`}
                          style={{
                            width: isSelected ? 36 : 28,
                            height: isSelected ? 36 : 28,
                            backgroundColor: color,
                          }}
                        >
                          {sm.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" style={{ borderTopColor: color }} />
                        {/* Tooltip */}
                        <div className="hidden group-hover:block absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                          {sm.name} · {sm.lastSeen}
                        </div>
                      </button>
                    </div>
                  );
                })}

                {/* Legend */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-xl p-3 shadow-md border border-border/50">
                  <p className="text-[10px] font-semibold text-muted-foreground mb-2">SALESMEN</p>
                  {salesmen.map((sm) => (
                    <div key={sm.id} className="flex items-center gap-1.5 mb-1">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: mapColors[sm.territory] || '#6d28d9' }} />
                      <span className="text-[10px] text-foreground">{sm.name}</span>
                      <span className={`text-[9px] ml-1 ${sm.status === 'Active' ? 'text-emerald-600' : 'text-gray-400'}`}>
                        {sm.status === 'Active' ? '● Live' : '○ Offline'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Salesman Detail */}
      {selected && (
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-semibold">
              {selected.name} — Today's GPS Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { label: 'Territory', value: selected.territory },
                { label: 'Status', value: selected.status },
                { label: 'First Check-in', value: '09:02 AM' },
                { label: 'Last Check-out', value: '—' },
                { label: 'Distance Today', value: '14.3 km' },
                { label: 'Visit Duration Avg', value: '22 min' },
                { label: 'Visits Done', value: String(selected.todayVisits) },
                { label: 'Pending Visits', value: String(selected.pendingVisits) },
                { label: 'Orders Booked', value: String(selected.ordersBooked) },
                { label: 'Collection', value: `₹${selected.collectionToday.toLocaleString('en-IN')}` },
                { label: 'Coordinates', value: `${selected.lat}°N` },
                { label: 'Last Seen', value: selected.lastSeen },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 rounded-xl bg-muted/50">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</p>
                  <p className="font-semibold text-sm text-foreground mt-0.5 truncate">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
