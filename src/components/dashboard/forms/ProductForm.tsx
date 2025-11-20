/* eslint-disable @typescript-eslint/no-explicit-any */
// ProductForm.tsx

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
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Controller,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const priceVariationSchema = z.object({
  size: z.string().nullable(),
  color: z.string().nullable(),
  costPrice: z.number(),
  sellingPrice: z.number(),
  sku: z.string().optional(),
  quantity: z.number(),
  supplier: z.string().nullable(),
});

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  minimumStock: z.number().min(0),
  category: z.string().min(1),
  imageUrl: z.string().optional().nullable(),
  priceVariations: z.array(priceVariationSchema).min(1),
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
  const { data: usersData } = useGetAllUsersQuery(undefined);
  const { uploadImage, isUploading } = useImageUploadImgbb();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    initialData?.imageUrl
  );

  const suppliers =
    usersData?.data?.items.filter((user: any) => user.role === "supplier") || [];

  const {
    control,
    handleSubmit,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
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
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "priceVariations",
  });

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("description", initialData.description || "");
      setValue("minimumStock", initialData.minimumStock);
      setValue("category", initialData.category);
      setValue("imageUrl", initialData.imageUrl || null);
      setValue("priceVariations", initialData.priceVariations || []);
      setPreviewUrl(initialData.imageUrl);
    }
  }, [initialData, setValue]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

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
      } else {
        await updateProduct({ id: initialData._id, ...data }).unwrap();
        toast.success("Product updated successfully");
      }
      onSubmit();
    } catch {
      toast.error("Failed to save product");
    }
  };

  const categories = [
    "Blue Cut Glasses",
    "Smart Sun Glasses",
    "Gadgets",
    "Clothing",
    "Accessories",
    "Smart Watches",
    "Watches",
    "Audio Equipment",
    "Wallets",
    "Bags",
    "Belts",
  ];

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* Image Upload */}
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

      {/* Basic Product Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Product Name</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <div>
          <Label>Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose category" />
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
        </div>
      </div>

      <div>
        <Label>Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea rows={3} {...field} placeholder="Description" />
          )}
        />
      </div>

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
      </div>

      {/* Price Variations */}
      <div className="border p-4 rounded-md space-y-4">
        <h3 className="font-semibold">Price Variations</h3>
        {fields.map((item, index) => (
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 border rounded-md p-4 relative"
            key={item.id}
          >
            <div>
              <Label>Size</Label>
              <Controller
                control={control}
                name={`priceVariations.${index}.size`}
                render={({ field: { value, ...rest } }) => (
                  <Input placeholder="Size" value={value ?? ""} {...rest} />
                )}
              />
            </div>
            <div>
              <Label>Color</Label>
              <Controller
                control={control}
                name={`priceVariations.${index}.color`}
                render={({ field: { value, ...rest } }) => (
                  <Input placeholder="Color" value={value ?? ""} {...rest} />
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
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                )}
              />
            </div>
            <div>
              <Label>Selling Price</Label>
              <Controller
                control={control}
                name={`priceVariations.${index}.sellingPrice`}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                )}
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Controller
                control={control}
                name={`priceVariations.${index}.quantity`}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                  />
                )}
              />
            </div>
            <div className="col-span-2 md:col-span-3">
              <Label>Supplier</Label>
              <Controller
                control={control}
                name={`priceVariations.${index}.supplier`}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier: any) => (
                        <SelectItem key={supplier._id} value={supplier._id}>
                          {supplier.profile?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <Button
              type="button"
              variant="destructive"
              className=""
              onClick={() => remove(index)}
            >
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