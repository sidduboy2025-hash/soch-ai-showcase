import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Upload, Sparkles } from "lucide-react";
import { categories } from "@/data/models";
import { useToast } from "@/hooks/use-toast";

export default function UploadModel() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    longDescription: "",
    category: "",
    provider: "",
    pricing: "freemium" as "free" | "freemium" | "paid",
    modelType: "",
    externalUrl: "",
    isApiAvailable: false,
    isOpenSource: false,
  });

  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [bestFor, setBestFor] = useState<string[]>([]);
  const [newBestFor, setNewBestFor] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [examplePrompts, setExamplePrompts] = useState<string[]>([]);
  const [newPrompt, setNewPrompt] = useState("");

  const capabilityOptions = ["text", "image", "audio", "video", "code", "agent"];
  const pricingOptions = [
    { value: "free", label: "Free" },
    { value: "freemium", label: "Freemium" },
    { value: "paid", label: "Paid" }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const toggleCapability = (capability: string) => {
    setCapabilities(prev => 
      prev.includes(capability)
        ? prev.filter(c => c !== capability)
        : [...prev, capability]
    );
  };

  const addBestFor = () => {
    if (newBestFor.trim() && !bestFor.includes(newBestFor.trim())) {
      setBestFor(prev => [...prev, newBestFor.trim()]);
      setNewBestFor("");
    }
  };

  const removeBestFor = (item: string) => {
    setBestFor(prev => prev.filter(b => b !== item));
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures(prev => [...prev, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    setFeatures(prev => prev.filter(f => f !== feature));
  };

  const addPrompt = () => {
    if (newPrompt.trim() && !examplePrompts.includes(newPrompt.trim())) {
      setExamplePrompts(prev => [...prev, newPrompt.trim()]);
      setNewPrompt("");
    }
  };

  const removePrompt = (prompt: string) => {
    setExamplePrompts(prev => prev.filter(p => p !== prompt));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.shortDescription || !formData.category || !formData.provider) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Submitting model:", {
      ...formData,
      tags,
      capabilities,
      bestFor,
      features,
      examplePrompts,
    });

    toast({
      title: "Success!",
      description: "Your AI model has been submitted for review.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Upload Your AI Model</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Share your AI model with the community. Fill out the form below with detailed information about your model to help users discover and understand its capabilities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Provide the essential details about your AI model.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Model Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., GPT-4 Turbo"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider">Provider *</Label>
                    <Input
                      id="provider"
                      placeholder="e.g., OpenAI"
                      value={formData.provider}
                      onChange={(e) => handleInputChange("provider", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description *</Label>
                  <Input
                    id="shortDescription"
                    placeholder="Brief one-line description of your model"
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longDescription">Long Description</Label>
                  <Textarea
                    id="longDescription"
                    placeholder="Detailed description of your model's capabilities, use cases, and benefits"
                    value={formData.longDescription}
                    onChange={(e) => handleInputChange("longDescription", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.slug}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricing">Pricing Model</Label>
                    <Select value={formData.pricing} onValueChange={(value: any) => handleInputChange("pricing", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {pricingOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modelType">Model Type</Label>
                    <Input
                      id="modelType"
                      placeholder="e.g., LLM, Diffusion Model"
                      value={formData.modelType}
                      onChange={(e) => handleInputChange("modelType", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="externalUrl">External URL</Label>
                  <Input
                    id="externalUrl"
                    type="url"
                    placeholder="https://your-model-website.com"
                    value={formData.externalUrl}
                    onChange={(e) => handleInputChange("externalUrl", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags & Categories</CardTitle>
                <CardDescription>
                  Add relevant tags to help users discover your model.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Capabilities</Label>
                  <div className="flex flex-wrap gap-3">
                    {capabilityOptions.map((capability) => (
                      <div key={capability} className="flex items-center space-x-2">
                        <Checkbox
                          id={capability}
                          checked={capabilities.includes(capability)}
                          onCheckedChange={() => toggleCapability(capability)}
                        />
                        <Label htmlFor={capability} className="capitalize">
                          {capability}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
                <CardDescription>
                  Provide more context about your model's use cases and features.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Best For</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="e.g., Developers, Content Creators"
                      value={newBestFor}
                      onChange={(e) => setNewBestFor(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBestFor())}
                    />
                    <Button type="button" onClick={addBestFor} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {bestFor.map((item) => (
                      <Badge key={item} variant="outline" className="flex items-center gap-1">
                        {item}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => removeBestFor(item)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Key Features</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="e.g., Real-time processing, 100+ languages"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <Button type="button" onClick={addFeature} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {features.map((feature) => (
                      <Badge key={feature} variant="outline" className="flex items-center gap-1">
                        {feature}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => removeFeature(feature)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Example Prompts</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="e.g., Write a Python function to sort an array"
                      value={newPrompt}
                      onChange={(e) => setNewPrompt(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrompt())}
                    />
                    <Button type="button" onClick={addPrompt} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {examplePrompts.map((prompt, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                        <span className="flex-1 text-sm">{prompt}</span>
                        <X
                          className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground"
                          onClick={() => removePrompt(prompt)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Model Properties</CardTitle>
                <CardDescription>
                  Specify technical details about your model.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isApiAvailable"
                      checked={formData.isApiAvailable}
                      onCheckedChange={(checked) => handleInputChange("isApiAvailable", checked as boolean)}
                    />
                    <Label htmlFor="isApiAvailable">API Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isOpenSource"
                      checked={formData.isOpenSource}
                      onCheckedChange={(checked) => handleInputChange("isOpenSource", checked as boolean)}
                    />
                    <Label htmlFor="isOpenSource">Open Source</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-end">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90">
                Submit for Review
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}