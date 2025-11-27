import { useState, useMemo } from "react";
import { Hero } from "@/components/Hero";
import { HorizontalCarousel } from "@/components/HorizontalCarousel";
import { ModelCard } from "@/components/ModelCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { CategoryChip } from "@/components/CategoryChip";
import { aiModels, categories } from "@/data/models";
import { Navbar } from "@/components/Navbar";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChip, setSelectedChip] = useState("All");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);

  const chips = ["All", "Chatbots", "Agents", "Image", "Code", "Productivity", "Voice", "Research"];

  const filteredModels = useMemo(() => {
    return aiModels.filter((model) => {
      const matchesSearch =
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesChip =
        selectedChip === "All" ||
        model.category.toLowerCase() === selectedChip.toLowerCase();

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(model.category);

      const matchesPricing =
        selectedPricing.length === 0 || selectedPricing.includes(model.pricing);

      const matchesCapabilities =
        selectedCapabilities.length === 0 ||
        selectedCapabilities.some((cap) => model.capabilities.includes(cap as any));

      return (
        matchesSearch &&
        matchesChip &&
        matchesCategory &&
        matchesPricing &&
        matchesCapabilities
      );
    });
  }, [searchQuery, selectedChip, selectedCategories, selectedPricing, selectedCapabilities]);

  const trendingModels = useMemo(
    () =>
      [...aiModels]
        .filter((m) => m.trendingScore)
        .sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0))
        .slice(0, 6),
    []
  );

  const newModels = useMemo(
    () =>
      [...aiModels]
        .sort(
          (a, b) =>
            new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        )
        .slice(0, 6),
    []
  );

  const featuredModels = useMemo(
    () => aiModels.filter((m) => m.featured).slice(0, 6),
    []
  );

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedPricing([]);
    setSelectedCapabilities([]);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const togglePricing = (pricing: string) => {
    setSelectedPricing((prev) =>
      prev.includes(pricing) ? prev.filter((p) => p !== pricing) : [...prev, pricing]
    );
  };

  const toggleCapability = (capability: string) => {
    setSelectedCapabilities((prev) =>
      prev.includes(capability)
        ? prev.filter((c) => c !== capability)
        : [...prev, capability]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        <Hero onSearch={setSearchQuery} />

        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {chips.map((chip) => (
              <CategoryChip
                key={chip}
                label={chip}
                isActive={selectedChip === chip}
                onClick={() => setSelectedChip(chip)}
              />
            ))}
          </div>
        </div>

        {!searchQuery && selectedChip === "All" && (
          <div className="mb-12 space-y-8">
            <HorizontalCarousel
              title="🔥 Trending AI Models"
              description="Most popular models this week"
            >
              {trendingModels.map((model) => (
                <div key={model.id} className="w-80 flex-shrink-0 snap-start">
                  <ModelCard model={model} />
                </div>
              ))}
            </HorizontalCarousel>

            <HorizontalCarousel
              title="✨ New & Noteworthy"
              description="Recently added and updated"
            >
              {newModels.map((model) => (
                <div key={model.id} className="w-80 flex-shrink-0 snap-start">
                  <ModelCard model={model} />
                </div>
              ))}
            </HorizontalCarousel>

            <HorizontalCarousel
              title="⭐ Featured Models"
              description="Hand-picked by our team"
            >
              {featuredModels.map((model) => (
                <div key={model.id} className="w-80 flex-shrink-0 snap-start">
                  <ModelCard model={model} />
                </div>
              ))}
            </HorizontalCarousel>
          </div>
        )}

        <div className="flex gap-6">
          <div className="hidden lg:block">
            <FilterSidebar
              selectedCategories={selectedCategories}
              selectedPricing={selectedPricing}
              selectedCapabilities={selectedCapabilities}
              onCategoryChange={toggleCategory}
              onPricingChange={togglePricing}
              onCapabilityChange={toggleCapability}
              onClearAll={handleClearFilters}
            />
          </div>

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {searchQuery
                  ? `Search Results (${filteredModels.length})`
                  : "All Models"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filteredModels.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>

            {filteredModels.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-2">
                  No models found
                </p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
