"use client";

import { useState } from "react";
import { locations } from "src/const/lokasi";

// ------------------------------------------------------------

const ITEMS_PER_PAGE = 12;

// ------------------------------------------------------------

export function useCariUmkm(umkm: any[]) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isRecommendedOnly, setIsRecommendedOnly] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // ── Derived data ──────────────────────────────────────────
  const uniqueCategories = Array.from(
    new Set(umkm.map((item) => item.category)),
  ).sort((a, b) => a.localeCompare(b));

  const sortedLocations = [...locations].sort((a, b) =>
    a.kecamatan.localeCompare(b.kecamatan),
  );

  const filteredUmkm = [...umkm]
    .filter((item) => {
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        const matchesQuery =
          item.name.toLowerCase().includes(lowerQuery) ||
          item.category.toLowerCase().includes(lowerQuery) ||
          item.location.toLowerCase().includes(lowerQuery);
        if (!matchesQuery) return false;
      }

      if (isRecommendedOnly && !item.recommended) return false;

      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(item.category)
      )
        return false;

      if (selectedLocations.length > 0) {
        const isMatch = locations.some((loc) => {
          if (!selectedLocations.includes(loc.kecamatan)) return false;
          return (
            loc.kecamatan === item.location || loc.desa.includes(item.location)
          );
        });
        if (!isMatch) return false;
      }

      return true;
    })
    .sort((a, b) => Number(b.recommended) - Number(a.recommended));

  const totalPages = Math.ceil(filteredUmkm.length / ITEMS_PER_PAGE);

  const paginatedUmkm = filteredUmkm.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // ── Handlers ──────────────────────────────────────────────
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value === "") {
      setSearchQuery("");
      setCurrentPage(1);
    }
  };

  const executeSearch = () => {
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") executeSearch();
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

  const toggleCategory = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category),
    );
    setCurrentPage(1);
  };

  const toggleLocation = (kecamatan: string, checked: boolean) => {
    setSelectedLocations((prev) =>
      checked ? [...prev, kecamatan] : prev.filter((l) => l !== kecamatan),
    );
    setCurrentPage(1);
  };

  const toggleRecommended = (checked: boolean) => {
    setIsRecommendedOnly(checked);
    setCurrentPage(1);
  };

  return {
    // state
    searchInput,
    isRecommendedOnly,
    selectedCategories,
    selectedLocations,
    currentPage,
    // derived
    uniqueCategories,
    sortedLocations,
    filteredUmkm,
    paginatedUmkm,
    totalPages,
    // handlers
    handleSearchChange,
    executeSearch,
    handleKeyDown,
    handlePrevPage,
    handleNextPage,
    handlePageClick,
    toggleCategory,
    toggleLocation,
    toggleRecommended,
  };
}
