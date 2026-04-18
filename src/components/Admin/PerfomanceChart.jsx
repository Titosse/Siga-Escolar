import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PerformanceChart() {
  const data = [
    { turma: "8ª A", media: 14 },
    { turma: "8ª B", media: 12 },
    { turma: "9ª A", media: 16 },
    { turma: "9ª B", media: 11 },
    { turma: "10ª A", media: 15 },
    { turma: "10ª B", media: 13 },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Desempenho por Turma
      </h3>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={80}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="turma" />
            <YAxis domain={[0, 20]} />
            <Tooltip />
            <Bar dataKey="media" radius={[8, 8, 0, 0] } fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PerformanceChart;
