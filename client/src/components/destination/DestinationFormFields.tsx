"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SafeImage } from "@/components/ui/safe-image";
import {
  HALAL_CATEGORIES,
  type DestinationFormPayload,
} from "@/lib/types/destinations";
import { useLanguage } from "@/context/language-context";

interface DestinationFormFieldsProps {
  form: DestinationFormPayload;
  onChange: (field: keyof DestinationFormPayload, value: string) => void;
  idPrefix?: string;
}

const LOCAL_IMAGE_PRESETS = [
  { label: "Makkah", path: "/images/makkah-madinah.jpg" },
  { label: "Istanbul", path: "/images/istanbul.jpg" },
  { label: "Granada", path: "/images/granada.jpg" },
  { label: "Sarajevo", path: "/images/sarajevo.jpg" },
  { label: "Langkawi", path: "/images/kuala-lumpur.jpg" },
  { label: "Marrakech", path: "/images/marrakech.jpg" },
];

export function DestinationFormFields({
  form,
  onChange,
  idPrefix = "dest",
}: DestinationFormFieldsProps) {
  const { t } = useLanguage();

  return (
    <div className="grid gap-5">
      {/* Destination Name */}
      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}-name`}>{t.addDestination.nameLabel}</Label>
        <Input
          id={`${idPrefix}-name`}
          placeholder={t.addDestination.namePlaceholder}
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
      </div>

      {/* Country + Category */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}-country`}>{t.addDestination.countryLabel}</Label>
          <Input
            id={`${idPrefix}-country`}
            placeholder={t.addDestination.countryPlaceholder}
            value={form.country}
            onChange={(e) => onChange("country", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}-category`}>{t.addDestination.categoryLabel}</Label>
          <Select
            value={form.category}
            onValueChange={(val) => onChange("category", val || "")}
          >
            <SelectTrigger id={`${idPrefix}-category`}>
              <SelectValue placeholder={t.addDestination.categorySelectPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {HALAL_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {t.categories[cat as keyof typeof t.categories] || cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price + Duration + Departure Date */}
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}-price`}>{t.addDestination.priceLabel}</Label>
          <Input
            id={`${idPrefix}-price`}
            type="number"
            min="0"
            step="1"
            placeholder={t.addDestination.pricePlaceholder}
            value={form.price}
            onChange={(e) => onChange("price", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}-duration`}>{t.addDestination.durationLabel}</Label>
          <Input
            id={`${idPrefix}-duration`}
            placeholder={t.addDestination.durationPlaceholder}
            value={form.duration}
            onChange={(e) => onChange("duration", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}-departure`}>{t.addDestination.departureLabel}</Label>
          <Input
            id={`${idPrefix}-departure`}
            type="date"
            value={form.departureDate}
            onChange={(e) => onChange("departureDate", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Halal Dining Verification */}
      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}-halal`}>{t.addDestination.diningLabel}</Label>
        <Input
          id={`${idPrefix}-halal`}
          placeholder={t.addDestination.diningPlaceholder}
          value={form.halalDining}
          onChange={(e) => onChange("halalDining", e.target.value)}
          required
        />
      </div>

      {/* Prayer Facilities */}
      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}-prayer`}>{t.addDestination.prayerLabel}</Label>
        <Input
          id={`${idPrefix}-prayer`}
          placeholder={t.addDestination.prayerPlaceholder}
          value={form.prayerFacilities}
          onChange={(e) => onChange("prayerFacilities", e.target.value)}
          required
        />
      </div>

      {/* Image URL + Presets */}
      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}-image`}>{t.addDestination.imageLabel}</Label>
        <Input
          id={`${idPrefix}-image`}
          type="url"
          placeholder={t.addDestination.imagePlaceholder}
          value={form.imageUrl}
          onChange={(e) => onChange("imageUrl", e.target.value)}
          required
        />

        {/* Local bundled image helper chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
          <span>{t.addDestination.presetLabel}</span>
          {LOCAL_IMAGE_PRESETS.map((preset) => (
            <button
              key={preset.path}
              type="button"
              onClick={() => onChange("imageUrl", preset.path)}
              className="rounded-md border border-border bg-secondary/60 px-2 py-0.5 font-medium hover:bg-secondary cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {form.imageUrl && (
          <div className="relative mt-2 h-40 w-full overflow-hidden rounded-lg border border-border bg-muted">
            <SafeImage
              src={form.imageUrl}
              alt="Destination image preview"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Description */}
      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}-desc`}>{t.addDestination.descLabel}</Label>
        <Textarea
          id={`${idPrefix}-desc`}
          rows={4}
          placeholder={t.addDestination.descPlaceholder}
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          required
        />
      </div>
    </div>
  );
}
