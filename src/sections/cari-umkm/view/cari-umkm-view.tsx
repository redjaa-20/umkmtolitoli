"use client";

import {
  Location01Icon,
  PreferenceHorizontalIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
import { Checkbox } from "src/components/ui/checkbox";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "src/components/ui/combobox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "src/components/ui/drawer";
import { Field, FieldGroup } from "src/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "src/components/ui/input-group";
import { Label } from "src/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "src/components/ui/pagination";
import { locations } from "src/const/lokasi";
import { umkm } from "src/const/umkm";

export function CariUmkmView() {
  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isRecommendedOnly, setIsRecommendedOnly] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const uniqueCategories = Array.from(
    new Set(umkm.map((item) => item.category)),
  );

  // Removed `uniqueLocations` definition because we render from `locations` imported directly

  const filteredUmkm = [...umkm]
    .filter((item) => {
      // Name/Category/Location Search matching
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        const matchesQuery =
          item.name.toLowerCase().includes(lowerQuery) ||
          item.category.toLowerCase().includes(lowerQuery) ||
          item.location.toLowerCase().includes(lowerQuery);
        if (!matchesQuery) return false;
      }

      // Recommend matching
      if (isRecommendedOnly && !item.recommended) {
        return false;
      }

      // Category matching
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(item.category)
      ) {
        return false;
      }

      // Location matching
      if (selectedLocations.length > 0) {
        const isMatch = locations.some((loc) => {
          if (!selectedLocations.includes(loc.kecamatan)) return false;
          return (
            loc.kecamatan === item.location || loc.desa.includes(item.location)
          );
        });

        if (!isMatch) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => Number(b.recommended) - Number(a.recommended));

  const totalPages = Math.ceil(filteredUmkm.length / ITEMS_PER_PAGE);

  const paginatedUmkm = filteredUmkm.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const executeSearch = () => {
    setSearchQuery(searchInput);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  const handlePrevPage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber: number, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  const renderFilters = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h5 className="font-medium">Rekomendasi</h5>
        <FieldGroup className="gap-3">
          <Field orientation="horizontal">
            <Checkbox
              id="rekomendasi-umkm"
              name="rekomendasi-umkm"
              className="data-checked:bg-green-500 data-checked:border-green-500 size-5 hover:cursor-pointer"
              checked={isRecommendedOnly}
              onCheckedChange={(checked) => {
                setIsRecommendedOnly(checked as boolean);
                setCurrentPage(1);
              }}
            />
            <Label
              className="font-normal capitalize cursor-pointer"
              htmlFor="rekomendasi-umkm"
            >
              Lihat Rekomendasi
            </Label>
          </Field>
        </FieldGroup>
      </div>
      <div className="space-y-4">
        <h5 className="font-medium">Kategori</h5>
        <FieldGroup className="gap-3">
          {uniqueCategories.map((category, index) => (
            <Field key={index} orientation="horizontal">
              <Checkbox
                id={`category-${index}`}
                name={`category-${category}`}
                className="data-checked:bg-green-500 data-checked:border-green-500 size-5 hover:cursor-pointer"
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  setSelectedCategories((prev) =>
                    checked
                      ? [...prev, category]
                      : prev.filter((c) => c !== category),
                  );
                  setCurrentPage(1);
                }}
              />
              <Label
                className="font-normal capitalize cursor-pointer"
                htmlFor={`category-${index}`}
              >
                {category}
              </Label>
            </Field>
          ))}
        </FieldGroup>
      </div>
      <div className="space-y-4">
        <h5 className="font-medium">Lokasi</h5>
        <FieldGroup className="gap-3">
          {locations.map((group, groupIdx) => (
            <Field key={groupIdx} orientation="horizontal">
              <Checkbox
                id={`kecamatan-${groupIdx}`}
                name={`kecamatan-${group.kecamatan}`}
                className="data-checked:bg-green-500 data-checked:border-green-500 size-5 hover:cursor-pointer"
                checked={selectedLocations.includes(group.kecamatan)}
                onCheckedChange={(checked) => {
                  setSelectedLocations((prev) =>
                    checked
                      ? [...prev, group.kecamatan]
                      : prev.filter((l) => l !== group.kecamatan),
                  );
                  setCurrentPage(1);
                }}
              />
              <Label
                className="font-normal capitalize cursor-pointer"
                htmlFor={`kecamatan-${groupIdx}`}
              >
                {group.kecamatan}
              </Label>
            </Field>
          ))}
        </FieldGroup>
      </div>
    </div>
  );

  return (
    <section className="relative py-5 md:py-10">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-15">
          <div className="hidden md:block md:col-span-1">{renderFilters()}</div>
          <div className="md:col-span-3 space-y-10">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-y-7">
              {paginatedUmkm.map((item, index) => (
                <Link key={index} href={`/umkm/${item.slug}`} className="group">
                  <Card className="py-0 ring-0">
                    <CardContent className="flex flex-col gap-3 px-0">
                      <div className="w-full aspect-video md:aspect-14/9 relative overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {item.recommended && (
                          <div className="absolute top-3 left-0">
                            <span className="text-xs bg-linear-to-tr from-lime-500 to-green-500 text-white p-1.5 pr-3 rounded-r-full">
                              Rekomendasi
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="px-1 space-y-1">
                        <h3 className="font-medium line-clamp-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <HugeiconsIcon
                            icon={Location01Icon}
                            className="size-4 text-muted-foreground"
                          />
                          <p className="text-sm text-muted-foreground">
                            {item.location}
                          </p>
                        </div>
                        <p className="capitalize text-sm text-muted-foreground">
                          {item.category}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="w-full flex justify-center mt-10">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={handlePrevPage}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageIdx = idx + 1;
                      return (
                        <PaginationItem key={pageIdx}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === pageIdx}
                            onClick={(e) => handlePageClick(pageIdx, e)}
                          >
                            {pageIdx}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={handleNextPage}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
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
              {/* <DrawerDescription>
                Filter UMKM berdasarkan kategori dan lokasi
              </DrawerDescription> */}
            </DrawerHeader>
            <div className="px-4 pb-8 overflow-y-auto max-h-[60vh] md:max-h-none">
              {renderFilters()}
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
