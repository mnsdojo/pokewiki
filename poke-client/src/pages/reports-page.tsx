import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { PokemonLoader } from "@/components/ui/pokemon-loader";
import { usePokemon } from "@/hooks/usePokemon";
import { cn } from "@/lib/utils";
import {
  Database,
  PieChartIcon,
  Ruler,
  Scan,
  Weight,
  type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
const POKEMON_TYPE_COLORS: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};
function ReportsPage() {
  const { data, isLoading, error } = usePokemon(1, 151);

  const stats = useMemo(() => {
    if (!data?.results) return null;
    const pokemonList = data.results;
    const typeCounts: Record<string, number> = {};

    pokemonList.forEach((pokemon) => {
      pokemon.types.forEach((type) => {
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      });
    });
    const typeData = Object.entries(typeCounts)
      .map(([name, value]) => ({
        name,
        value,
        fill: POKEMON_TYPE_COLORS[name] || "#777",
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
    const avgHeight =
      pokemonList.reduce((acc, curr) => acc + curr.height, 0) /
      pokemonList.length;

    const avgWeight =
      pokemonList.reduce((acc, curr) => acc + curr.weight, 0) /
      pokemonList.length;

    // top 5 heavy pokemons
    const heaviestPokemon = [...pokemonList]
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 5)
      .map((p) => ({
        name: p.name,
        weight: p.weight / 10,
        fill: "#705746",
      }));
    return {
      typeData,
      avgHeight,
      avgWeight,
      heaviestPokemon,
      count: pokemonList.length,
    };
  }, [data]);
  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <PokemonLoader text="Analyzing battle data..." size="lg" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load report data.
      </div>
    );
  }
  const typeChartConfig = {
    value: { label: "Count" },
    ...Object.fromEntries(
      stats.typeData.map((t) => [
        t.name,
        {
          label: t.name.charAt(0).toUpperCase() + t.name.slice(1),
          color: t.fill,
        },
      ]),
    ),
  } satisfies ChartConfig;

  const heavyChartConfig = {
    weight: { label: "Weight (kg)", color: "#705746" },
    name: { label: "Name" },
  } satisfies ChartConfig;

  return (
    <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Battle Reports
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1">
            Deep dive into your Pokédex statistics and metrics.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full">
          <Database className="w-4 h-4" />
          <span>Gen 1 Dataset</span>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Total Pokémon"
          value={stats.count}
          subtitle="Indexed in Database"
          icon={Scan}
          color="text-blue-500"
          bg="bg-blue-50 dark:bg-blue-950/20"
        />
        <StatsCard
          title="Average Height"
          value={`${(stats.avgHeight / 10).toFixed(2)}m`}
          subtitle="Across all types"
          icon={Ruler}
          color="text-emerald-500"
          bg="bg-emerald-50 dark:bg-emerald-950/20"
        />
        <StatsCard
          title="Average Weight"
          value={`${(stats.avgWeight / 10).toFixed(2)}kg`}
          subtitle="Mass variance"
          icon={Weight}
          color="text-amber-500"
          bg="bg-amber-50 dark:bg-amber-950/20"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Type Distribution */}

        <Card className="col-span-4 border-none shadow-lg bg-linear-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-neutral-500" />
              Type Distribution
            </CardTitle>
            <CardDescription>
              Composition of Pokémon types in the current generation
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={typeChartConfig}
              className="mx-auto aspect-square max-h-75"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={stats.typeData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  strokeWidth={2}
                  paddingAngle={1}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {stats.count}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground text-xs font-medium uppercase tracking-wider"
                            >
                              Total
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>

                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                  className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="text-sm text-neutral-500 justify-center border-t border-neutral-100 dark:border-neutral-800 pt-4 bg-white/50 dark:bg-neutral-900/50">
            Dominant Type:{" "}
            <span className="font-bold ml-1 text-foreground capitalize">
              {stats.typeData[0]?.name}
            </span>
          </CardFooter>
        </Card>

        {/* Heaviest pokemon */}
        <Card className="col-span-3 border-none shadow-lg bg-linear-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Weight className="w-5 h-5 text-neutral-500" />
              Heaviest Pokémon
            </CardTitle>
            <CardDescription>Top contenders by mass</CardDescription>
          </CardHeader>

          <CardContent>
            <ChartContainer config={heavyChartConfig}>
              <BarChart
                accessibilityLayer
                data={stats.heaviestPokemon}
                layout="vertical"
                margin={{ left: 0, right: 48 }}
                barGap={2}
              >
                <CartesianGrid
                  horizontal={false}
                  strokeDasharray="3 3"
                  strokeOpacity={0.5}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  hide
                />
                <XAxis dataKey="weight" type="number" hide />
                <ChartTooltip
                  cursor={{ fill: "rgba(0,0,0,0.02)" }}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="weight"
                  layout="vertical"
                  radius={[0, 8, 8, 0]}
                  fillOpacity={0.9}
                  barSize={32}
                  className="drop-shadow-sm"
                >
                  <LabelList
                    dataKey="name"
                    position="insideLeft"
                    offset={12}
                    className="fill-white font-bold capitalize drop-shadow-sm transition-all"
                    fontSize={11}
                  />
                  <LabelList
                    dataKey="weight"
                    position="right"
                    offset={12}
                    className="fill-muted-foreground font-medium"
                    fontSize={12}
                    formatter={(val: number) => `${val}kg`}
                  />
                  {stats.heaviestPokemon.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#ef4444" : "#705746"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="text-sm text-neutral-500 justify-center border-t border-neutral-100 dark:border-neutral-800 pt-4 bg-white/50 dark:bg-neutral-900/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Heaviest
              <span className="w-2 h-2 rounded-full bg-[#705746]" /> Others
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default ReportsPage;

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  bg,
}: StatsCardProps) {
  return (
    <Card className="border-none shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {title}
          </p>
          <h3 className="text-2xl font-bold mt-2 tracking-tight">{value}</h3>
          <p className="text-xs text-neutral-400 mt-1">{subtitle}</p>
        </div>
        <div className={cn("p-3 rounded-xl", bg)}>
          <Icon className={cn("w-5 h-5", color)} />
        </div>
      </div>
    </Card>
  );
}
