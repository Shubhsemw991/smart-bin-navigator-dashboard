
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Recycle, Box, Trash, Boxes } from "lucide-react";

type WasteCategory = {
  id: string;
  name: string;
  description: string;
  examples: string[];
  icon: React.ElementType;
  color: string;
}

const wasteCategories: WasteCategory[] = [
  {
    id: "recyclable",
    name: "Recyclable",
    description: "Materials that can be processed and used again",
    examples: ["Paper", "Cardboard", "Glass bottles", "Aluminum cans", "Plastic bottles (PET)", "Newspapers", "Magazines"],
    icon: Recycle,
    color: "bg-green-100 text-green-800",
  },
  {
    id: "organic",
    name: "Organic",
    description: "Biodegradable materials that can be composted",
    examples: ["Food scraps", "Fruit peels", "Coffee grounds", "Tea bags", "Yard waste", "Leaves", "Plant trimmings"],
    icon: Box,
    color: "bg-amber-100 text-amber-800",
  },
  {
    id: "general",
    name: "General Waste",
    description: "Non-recyclable and non-organic waste",
    examples: ["Styrofoam", "Plastic bags", "Candy wrappers", "Chip bags", "Broken ceramics", "Used tissues", "Diapers"],
    icon: Trash,
    color: "bg-gray-100 text-gray-800",
  },
  {
    id: "hazardous",
    name: "Hazardous",
    description: "Waste requiring special handling and disposal",
    examples: ["Batteries", "Paint", "Chemicals", "Light bulbs", "Electronic waste", "Medicine", "Motor oil"],
    icon: Boxes,
    color: "bg-red-100 text-red-800",
  },
];

const WasteSegregation = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Recycle className="h-5 w-5" />
          Waste Segregation Guide
        </CardTitle>
        <CardDescription>
          Learn how to properly segregate waste for efficient recycling and disposal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recyclable">
          <TabsList className="grid grid-cols-4 mb-4">
            {wasteCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex gap-2 items-center">
                <category.icon className="h-4 w-4" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {wasteCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${category.color}`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{category.name} Waste</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Common Examples:</h4>
                <div className="flex flex-wrap gap-2">
                  {category.examples.map((example, i) => (
                    <Badge key={i} variant="outline" className={category.color}>
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Proper Disposal:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
                  <li>Clean and rinse items before disposal</li>
                  <li>Remove any non-recyclable components</li>
                  <li>Place in the designated {category.name.toLowerCase()} bin</li>
                  <li>Compress items when possible to save space</li>
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WasteSegregation;
