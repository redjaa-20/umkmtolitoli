"use client";

import {
  PreferenceHorizontalIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "src/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "src/components/ui/drawer";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "src/components/ui/input-group";
import { useCariUmkm } from "../use-cari-umkm";
import { CariUmkmCard } from "../cari-umkm-card";
import { CariUmkmFilters } from "../cari-umkm-filters";
import { CariUmkmPagination } from "../cari-umkm-pagination";

// ------------------------------------------------------------

export function CariUmkmView({ initialUmkm }: { initialUmkm: any[] }) {
  const {
    searchInput,
    isRecommendedOnly,
    selectedCategories,
    selectedLocations,
    currentPage,
    uniqueCategories,
    sortedLocations,
    paginatedUmkm,
    totalPages,
    handleSearchChange,
    executeSearch,
    handleKeyDown,
    handlePrevPage,
    handleNextPage,
    handlePageClick,
    toggleCategory,
    toggleLocation,
    toggleRecommended,
  } = useCariUmkm(initialUmkm);

  const filterProps = {
    umkm: initialUmkm,
    uniqueCategories,
    sortedLocations,
    isRecommendedOnly,
    selectedCategories,
    selectedLocations,
    onToggleRecommended: toggleRecommended,
    onToggleCategory: toggleCategory,
    onToggleLocation: toggleLocation,
  };

  return (
    <section className="relative pt-2 pb-5 md:py-10">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-15">
          {/* Desktop Sidebar Filter */}
          <div className="hidden md:block md:col-span-1">
            <CariUmkmFilters {...filterProps} />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-7 md:space-y-10">
            {/* Search Bar */}
            <div className="flex items-center gap-2">
              <InputGroup className="h-10 md:h-11 rounded-full px-2">
                <InputGroupInput
                  placeholder="Cari UMKM..."
                  className="placeholder:text-sm"
                  value={searchInput}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                />
                <InputGroupAddon
                  onClick={executeSearch}
                  className="cursor-pointer hover:text-green-500 transition-colors"
                >
                  <HugeiconsIcon icon={Search01Icon} />
                </InputGroupAddon>
              </InputGroup>
            </div>

            {/* UMKM Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-y-7">
              {paginatedUmkm.map((item, index) => (
                <CariUmkmCard key={index} item={item} />
              ))}
            </div>

            {/* Pagination */}
            <CariUmkmPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              onPageClick={handlePageClick}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <div className="md:hidden fixed right-4 bottom-5">
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="secondary"
              className="h-11 gap-3 bg-green-500 text-white px-4 rounded-full"
            >
              <HugeiconsIcon icon={PreferenceHorizontalIcon} />
              Filter
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="mb-3">
              <DrawerTitle className="text-left text-xl">Filter</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-8 overflow-y-auto max-h-[60vh] md:max-h-none">
              <CariUmkmFilters {...filterProps} />
            </div>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button className="rounded-full bg-green-500 hover:bg-green-500/90 text-white h-11">
                  Terapkan Filter
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </section>
  );
}
