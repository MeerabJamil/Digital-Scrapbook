import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import SectionHeading from "../components/ui/SectionHeading";
import WashiTape from "../components/layout/WashiTape";
import { moodTrend, entriesPerMonth, moods } from "../data/mockData";

const MOOD_COLORS = { joyful: "#E8B84B", cozy: "#FFC29D", peaceful: "#AFC29B", nostalgic: "#C7B3EE", grateful: "#DDA9AC" };

export default function Analytics() {
  return (
    <div className="space-y-10">
      <SectionHeading eyebrow="your patterns" title="A little bit of analytics" subtitle="Not to measure you — just to notice what's true." />

      <div className="relative bg-cream-deep rounded-3xl p-6 shadow-[var(--shadow-paper)] paper-grain">
        <WashiTape tone="lavender" rotate={-8} className="-top-3 left-8" />
        <p className="font-hand text-3xl text-cocoa-deep mb-4">Mood over the last 6 months</p>
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <AreaChart data={moodTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#7A5A4520" />
              <XAxis dataKey="month" tick={{ fontFamily: "Nunito", fill: "#7A5A45", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily: "Nunito", fill: "#7A5A45", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontFamily: "Nunito", borderRadius: 12, border: "none", boxShadow: "var(--shadow-paper)" }} />
              {Object.entries(MOOD_COLORS).map(([key, color]) => (
                <Area key={key} type="monotone" dataKey={key} stackId="1" stroke={color} fill={color} fillOpacity={0.55} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          {moods.map((m) => (
            <span key={m.label} className="font-tape text-sm flex items-center gap-1.5 text-cocoa/70">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: MOOD_COLORS[m.label.toLowerCase()] }} /> {m.emoji} {m.label}
            </span>
          ))}
        </div>
      </div>

      <div className="relative bg-cream-deep rounded-3xl p-6 shadow-[var(--shadow-paper)] paper-grain">
        <WashiTape tone="peach" rotate={8} className="-top-3 right-8" />
        <p className="font-hand text-3xl text-cocoa-deep mb-4">Entries per month</p>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={entriesPerMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#7A5A4520" />
              <XAxis dataKey="month" tick={{ fontFamily: "Nunito", fill: "#7A5A45", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily: "Nunito", fill: "#7A5A45", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontFamily: "Nunito", borderRadius: 12, border: "none", boxShadow: "var(--shadow-paper)" }} />
              <Bar dataKey="entries" fill="#C6704B" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
