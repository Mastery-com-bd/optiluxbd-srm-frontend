// ProductForm.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
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
import { useImageUploadImgbb } from "@/hooks/imagebb/useImageUpload";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/inventory/inventoryApi";
import { useGetSuppliersQuery } from "@/redux/features/user/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Controller,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Zod Schemas
const priceVariationSchema = z.object({
  size: z.string().nullable(),
  color: z.string().nullable(),
  costPrice: z.number().min(0, "Cost price is required"),
  sellingPrice: z.number().min(0, "Selling price is required"),
  sku: z.string().optional(),
  quantity: z.number().min(0, "Quantity is required"),
  supplier: z.string().nullable(),
});

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  minimumStock: z.number().min(0, "Minimum stock must be >= 0"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().optional().nullable(),
  priceVariations: z.array(priceVariationSchema).min(1, "At least one variation required"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: any;
  onSubmit: () => void;
  isAdd: boolean;
}

const ProductForm = ({ initialData, onSubmit, isAdd }: ProductFormProps) => {
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { data: suppliersData } = useGetSuppliersQuery(undefined);
  const { uploadImage, isUploading } = useImageUploadImgbb();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(initialData?.imageUrl);
  const [supplierSearchTerm, setSupplierSearchTerm] = useState("");

  const suppliers = suppliersData?.data || [];
  const filteredSuppliers = useMemo(
    () =>
      suppliers.filter((supplier: any) =>
        (supplier.profile?.name || supplier.name || "")
          .toLowerCase()
          .includes(supplierSearchTerm.toLowerCase())
      ),
    [supplierSearchTerm, suppliers]
  );

  const defaultFormData: ProductFormData = {
    name: "",
    description: "",
    minimumStock: 0,
    category: "",
    imageUrl: null,
    priceVariations: [
      {
        size: null,
        color: null,
        costPrice: 0,
        sellingPrice: 0,
        sku: "",
        quantity: 0,
        supplier: null,
      },
    ],
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultFormData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "priceVariations",
  });

  useEffect(() => {
    if (initialData) {
      const fixedVariations = (initialData.priceVariations || []).map((v: any) => ({
        ...v,
        supplier: typeof v.supplier === "object" ? v.supplier?._id ?? null : v.supplier ?? null,
      }));

      reset({
        name: initialData.name || "",
        description: initialData.description || "",
        minimumStock: initialData.minimumStock || 0,
        category: initialData.category || "",
        imageUrl: initialData.imageUrl || null,
        priceVariations: fixedVariations,
      });

      setPreviewUrl(initialData.imageUrl);
    }
  }, [initialData, reset]);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      try {
        const { url } = await uploadImage(file);
        if (url) {
          setValue("imageUrl", url);
          toast.success("Image uploaded successfully");
        }
      } catch {
        setPreviewUrl(initialData?.imageUrl);
        toast.error("Failed to upload image");
      }
    }
  };

  const onFormSubmit = async (data: ProductFormData) => {
    try {
      if (isAdd) {
        await createProduct(data).unwrap();
        toast.success("Product created successfully");
      } else if (initialData?._id) {
        await updateProduct({ id: initialData._id, ...data }).unwrap();
        toast.success("Product updated successfully");
      } else {
        toast.error("Missing product ID for update.");
        return;
      }
      onSubmit();
    } catch (err) {
      console.error("ERROR SAVING PRODUCT:", err);
      toast.error("Failed to save product");
    }
  };

  const categories = [
    "Blue_Cut_Glasses",
    "Smart_Sun_Glasses",
    "Gadgets",
    "Clothing",
    "Accessories",
    "Smart_Watches",
    "Watches",
    "Audio_Equipment",
    "Wallets",
    "Bags",
    "Belts",
  ];

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* Image */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <img
            src={previewUrl || "/placeholder-image.png"}
            alt="Product preview"
            className="h-32 w-32 rounded-lg object-cover cursor-pointer"
            onClick={handleImageClick}
          />
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <Button
            type="button"
            size="icon"
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
            onClick={handleImageClick}
            disabled={isUploading}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Product Name</Label>
          <Controller name="name" control={control} render={({ field }) => <Input {...field} />} />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        {/* ✅ FIXED Category Selector */}
        <div>
          <Label>Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <p className="border border-red-600"> this is it.{field.value?field.value:"hi"}</p>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
        </div>
      </div>

      {/* Description */}
      <div>
        <Label>Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Textarea rows={3} {...field} placeholder="Description" />}
        />
      </div>

      {/* Minimum Stock */}
      <div>
        <Label>Minimum Stock</Label>
        <Controller
          name="minimumStock"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        {errors.minimumStock && (
          <p className="text-sm text-destructive">{errors.minimumStock.message}</p>
        )}
      </div>

      {/* Price Variations */}
      <div className="border p-4 rounded-md space-y-4">
        <h3 className="font-semibold">Price Variations</h3>
        {fields.map((item, index) => (
          <div key={item.id} className="grid grid-cols-2 md:grid-cols-3 gap-4 border rounded-md p-4">
            <div>
              <Label>Size</Label>
              <Controller
                control={control}
                name={`priceVariations.${index}.size`}
                render={({ field }) => (
                  <Input placeholder="Size" value={field.value ?? ""} onChange={field.onChange} />
                )}
              />
            </div>
            <div>
              <Label>Color</Label>
              <Controller
                control={control}
                name={`priceVariations.${index}.color`}
                render={({ field }) => (
                  <Input placeholder="Color" value={field.value ?? ""} onChange={field.onChange} />
                )}
              />
            </div>
            <div>
              <Label>SKU</Label>
              <Controller
                control={control}
                name={`priceVariations.${index}.sku`}
                render={({ field }) => <Input placeholder="SKU" {...field} />}
              />
            </div>
            <div>
              <Label>Cost Price</Label>
              <Controller
                control={control}
                name={`priceVariations.${index}.costPrice`}
                render={({ field }) => (
                  <Input type="number" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                )}
              />
              {errors.priceVariations?.[index]?.costPrice && (
                <p className="text-sm text-destructive">
                  {errors.priceVariations[index]?.costPrice?.message}
                </p>
              )}
            </div>
            <div>
              <Label>Selling Price</Label>
              <Controller
                control={control}
                name={`priceVariations.${index}.sellingPrice`}
                render={({ field }) => (
                  <Input type="number" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                )}
              />
              {errors.priceVariations?.[index]?.sellingPrice && (
                <p className="text-sm text-destructive">
                  {errors.priceVariations[index]?.sellingPrice?.message}
                </p>
              )}
            </div>
            <div>
              <Label>Quantity</Label>
              <Controller
                control={control}
                name={`priceVariations.${index}.quantity`}
                render={({ field }) => (
                  <Input type="number" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                )}
              />
              {errors.priceVariations?.[index]?.quantity && (
                <p className="text-sm text-destructive">
                  {errors.priceVariations[index]?.quantity?.message}
                </p>
              )}
            </div>

            {/* Supplier */}
            <div className="col-span-2 md:col-span-3">
              <Label>Supplier</Label>
              <Controller
                control={control}
                name={`priceVariations.${index}.supplier`}
                render={({ field }) => (
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="px-2 pt-2 sticky top-0 bg-white dark:bg-muted z-10">
                        <Input
                          placeholder="Search supplier..."
                          value={supplierSearchTerm}
                          onChange={(e) => setSupplierSearchTerm(e.target.value)}
                          className="h-8"
                        />
                      </div>
                      {filteredSuppliers.length > 0 ? (
                        filteredSuppliers.map((supplier: any) => (
                          <SelectItem key={supplier._id} value={supplier._id}>
                            {supplier.profile?.name || supplier.name || "Unknown"}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-3 text-sm text-muted-foreground">No suppliers found</div>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Remove */}
            <Button type="button" variant="destructive" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            append({
              size: null,
              color: null,
              costPrice: 0,
              sellingPrice: 0,
              sku: "",
              quantity: 0,
              supplier: null,
            })
          }
        >
          Add Price Variation
        </Button>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isUploading}>
          {isAdd ? "Add Product" : "Update Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;