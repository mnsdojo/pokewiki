import type { Pokemon } from "@/types/pokemon";
import { X } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PokemonDetailModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

function PokemonDetailModal({ pokemon, onClose }: PokemonDetailModalProps) {
  const statsData = pokemon.stats.map((s) => ({
    name: s.name.replace("-", " ").toUpperCase(),
    value: s.value,
  }));

  const typeData = pokemon.types.map((type) => ({
    name: type,
    value: 100 / pokemon.types.length,
  }));
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-neutral-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-200 border border-neutral-200 dark:border-neutral-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:bg-neutral-200 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-neutral-50 dark:bg-neutral-800/50 p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-neutral-200/50 mask-[linear-gradient(to_bottom,white,transparent)]" />

            <img
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              loading="lazy"
              className="w-64 h-64 object-contain drop-shadow-2xl relative z-10 hover:scale-110 transition-transform duration-500"
            />
            <div className="mt-8 text-center relative z-10">
              <h2 className="text-4xl font-black capitalize mb-2">
                {pokemon.name}
              </h2>
              <div className="flex gap-2 justify-center">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="px-4 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 font-bold text-sm uppercase tracking-wide"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Charts */}

          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                Base Stats
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={statsData}
                    margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="name"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="var(--primary)"
                      radius={[4, 4, 0, 0]}
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Pie Charts Stats */}

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-secondary rounded-full" />
                  Type Dist.
                </h3>
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={typeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {typeData.map((_entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Charts STats */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-neutral-400 rounded-full" />
                  Measurements
                </h3>
                <div className="space-y-4">
                  <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl">
                    <p className="text-xs text-neutral-500 uppercase font-bold">
                      Height
                    </p>
                    <p className="text-2xl font-mono">{pokemon.height / 10}m</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl">
                    <p className="text-xs text-neutral-500 uppercase font-bold">
                      Weight
                    </p>
                    <p className="text-2xl font-mono">
                      {pokemon.weight / 10}kg
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts*/}
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailModal;
