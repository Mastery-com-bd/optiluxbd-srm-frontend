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
import { type Product } from "@/data/mockData";
import { useEffect, useState } from "react";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => void;
}

const ProductForm = ({ initialData, onSubmit }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    imageUrl: "",
    costPrice: 0,
    sellingPrice: 0,
    currentStock: 0,
    minimumStock: 0,
    supplierId: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        category: initialData.category,
        imageUrl: initialData.imageUrl || "",
        costPrice: initialData.costPrice,
        sellingPrice: initialData.sellingPrice,
        currentStock: initialData.currentStock,
        minimumStock: initialData.minimumStock,
        supplierId: initialData.supplierId || "",
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const categories = [
    "Electronics",
    "Computers",
    "Accessories",
    "Mobile Phones",
    "Tablets",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="costPrice">Cost Price (BDT) *</Label>
          <Input
            id="costPrice"
            type="number"
            min="0"
            step="0.01"
            value={formData.costPrice}
            onChange={(e) =>
              setFormData({
                ...formData,
                costPrice: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sellingPrice">Selling Price (BDT) *</Label>
          <Input
            id="sellingPrice"
            type="number"
            min="0"
            step="0.01"
            value={formData.sellingPrice}
            onChange={(e) =>
              setFormData({
                ...formData,
                sellingPrice: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="currentStock">Current Stock *</Label>
          <Input
            id="currentStock"
            type="number"
            min="0"
            value={formData.currentStock}
            onChange={(e) =>
              setFormData({
                ...formData,
                currentStock: parseInt(e.target.value) || 0,
              })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="minimumStock">Minimum Stock *</Label>
          <Input
            id="minimumStock"
            type="number"
            min="0"
            value={formData.minimumStock}
            onChange={(e) =>
              setFormData({
                ...formData,
                minimumStock: parseInt(e.target.value) || 0,
              })
            }
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit">
          {initialData ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
