import { Checkbox } from "src/components/ui/checkbox";
import { Field, FieldGroup } from "src/components/ui/field";
import { Label } from "src/components/ui/label";

// ------------------------------------------------------------

type FilterGroup = {
  kecamatan: string;
  desa: string[];
};

type CariUmkmFiltersProps = {
  umkm: any[];
  uniqueCategories: string[];
  sortedLocations: FilterGroup[];
  isRecommendedOnly: boolean;
  selectedCategories: string[];
  selectedLocations: string[];
  onToggleRecommended: (checked: boolean) => void;
  onToggleCategory: (category: string, checked: boolean) => void;
  onToggleLocation: (kecamatan: string, checked: boolean) => void;
};

// ------------------------------------------------------------

export function CariUmkmFilters({
  umkm,
  uniqueCategories,
  sortedLocations,
  isRecommendedOnly,
  selectedCategories,
  selectedLocations,
  onToggleRecommended,
  onToggleCategory,
  onToggleLocation,
}: CariUmkmFiltersProps) {
  return (
    <div className="space-y-8">
      {/* Rekomendasi */}
      <div className="space-y-4">
        <h5 className="font-medium">Rekomendasi</h5>
        <FieldGroup className="gap-3">
          <Field orientation="horizontal">
            <Checkbox
              id="rekomendasi-umkm"
              name="rekomendasi-umkm"
              className="data-checked:bg-green-500 data-checked:border-green-500 size-5 hover:cursor-pointer"
              checked={isRecommendedOnly}
              onCheckedChange={(checked) =>
                onToggleRecommended(checked as boolean)
              }
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

      {/* Kategori */}
      <div className="space-y-4">
        <h5 className="font-medium">Kategori</h5>
        <FieldGroup className="gap-3">
          {uniqueCategories.map((category, index) => {
            const count = umkm.filter(
              (item) => item.category === category,
            ).length;
            return (
              <Field key={index} orientation="horizontal">
                <Checkbox
                  id={`category-${index}`}
                  name={`category-${category}`}
                  className="data-checked:bg-green-500 data-checked:border-green-500 size-5 hover:cursor-pointer"
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) =>
                    onToggleCategory(category, checked as boolean)
                  }
                />
                <Label
                  className="font-normal capitalize cursor-pointer"
                  htmlFor={`category-${index}`}
                >
                  {category} ({count})
                </Label>
              </Field>
            );
          })}
        </FieldGroup>
      </div>

      {/* Lokasi */}
      <div className="space-y-4">
        <h5 className="font-medium">Lokasi</h5>
        <FieldGroup className="gap-3">
          {sortedLocations.map((group, groupIdx) => {
            const count = umkm.filter(
              (item) =>
                item.location === group.kecamatan ||
                group.desa.includes(item.location),
            ).length;
            return (
              <Field key={groupIdx} orientation="horizontal">
                <Checkbox
                  id={`kecamatan-${groupIdx}`}
                  name={`kecamatan-${group.kecamatan}`}
                  className="data-checked:bg-green-500 data-checked:border-green-500 size-5 hover:cursor-pointer"
                  checked={selectedLocations.includes(group.kecamatan)}
                  onCheckedChange={(checked) =>
                    onToggleLocation(group.kecamatan, checked as boolean)
                  }
                />
                <Label
                  className="font-normal capitalize cursor-pointer"
                  htmlFor={`kecamatan-${groupIdx}`}
                >
                  {group.kecamatan} ({count})
                </Label>
              </Field>
            );
          })}
        </FieldGroup>
      </div>
    </div>
  );
}
