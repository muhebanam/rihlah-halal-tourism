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
  return (
    <div className="grid gap-5">
      {/* Destination Name */}
      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}-name`}>Destination Name</Label>
        <Input
          id={`${idPrefix}-name`}
          placeholder="e.g., Makkah & Madinah Spiritual Umrah"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
      </div>

      {/* Country + Category */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}-country`}>Country</Label>
          <Input
            id={`${idPrefix}-country`}
            placeholder="e.g., Saudi Arabia"
            value={form.country}
            onChange={(e) => onChange("country", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}-category-trigger`}>Category</Label>
          <Select
            value={form.category}
            onValueChange={(value) => onChange("category", value ?? "")}
          >
            <SelectTrigger id={`${idPrefix}-category-trigger`} className="w-full">
              <SelectValue placeholder="Select halal category" />
            </SelectTrigger>
            <SelectContent>
              {HALAL_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price + Duration */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}-price`}>Price (USD)</Label>
          <Input
            id={`${idPrefix}-price`}
            type="number"
            min="0"
            placeholder="e.g., 1450"
            value={form.price}
            onChange={(e) => onChange("price", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}-duration`}>Duration</Label>
          <Input
            id={`${idPrefix}-duration`}
            placeholder="e.g., 7 Days / 6 Nights"
            value={form.duration}
            onChange={(e) => onChange("duration", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Halal Dining + Prayer Facilities */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}-halalDining`}>Halal Dining Standard</Label>
          <Input
            id={`${idPrefix}-halalDining`}
            placeholder="e.g., 100% Zabiha Halal Certified"
            value={form.halalDining}
            onChange={(e) => onChange("halalDining", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}-prayerFacilities`}>
            Prayer &amp; Masjid Facilities
          </Label>
          <Input
            id={`${idPrefix}-prayerFacilities`}
            placeholder="e.g., Nearby Masjid & Prayer Stops"
            value={form.prayerFacilities}
            onChange={(e) => onChange("prayerFacilities", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Departure Date + Image URL */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}-departureDate`}>Departure Date</Label>
          <Input
            id={`${idPrefix}-departureDate`}
            type="date"
            value={form.departureDate}
            onChange={(e) => onChange("departureDate", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor={`${idPrefix}-imageUrl`}>Image URL or Path</Label>
            <span className="text-[11px] text-muted-foreground">
              Must start with / or https://
            </span>
          </div>
          <Input
            id={`${idPrefix}-imageUrl`}
            type="text"
            placeholder="e.g., /images/istanbul.jpg or https://..."
            value={form.imageUrl}
            onChange={(e) => onChange("imageUrl", e.target.value)}
            required
          />
          {/* Quick local image preset chips */}
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-medium text-muted-foreground">
              Preset:
            </span>
            {LOCAL_IMAGE_PRESETS.map((preset) => (
              <button
                key={preset.path}
                type="button"
                onClick={() => onChange("imageUrl", preset.path)}
                className="rounded-md border border-border bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground transition-colors hover:bg-[#047857]/10 hover:text-[#064E3B] cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Image Thumbnail Preview (if path is provided) */}
      {form.imageUrl?.trim() && (
        <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/40 p-3">
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-card border border-border">
            <SafeImage
              src={form.imageUrl}
              alt="Package preview"
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 text-xs">
            <p className="font-medium text-foreground">Image Preview</p>
            <p className="truncate text-muted-foreground">{form.imageUrl}</p>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="grid gap-2">
        <Label htmlFor={`${idPrefix}-description`}>Journey Description</Label>
        <Textarea
          id={`${idPrefix}-description`}
          placeholder="Describe the spiritual highlights, Islamic heritage stops, and halal hospitality..."
          className="min-h-28"
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          required
        />
      </div>
    </div>
  );
}
