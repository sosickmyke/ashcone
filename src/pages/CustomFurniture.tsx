import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Ruler, Palette, Box, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { furnitureTypes, materials, colors, specialFeatures } from '@/data';
import { useCustomRequests } from '@/store';
import { toast } from 'sonner';
import type { Page } from '@/App';
import type { CustomFurnitureRequest } from '@/types';

interface CustomFurnitureProps {
  navigate: (page: Page) => void;
}

const steps = [
  { id: 1, title: 'Type', icon: Box },
  { id: 2, title: 'Size', icon: Ruler },
  { id: 3, title: 'Materials', icon: Palette },
  { id: 4, title: 'Features', icon: Sparkles },
  { id: 5, title: 'Review', icon: Check },
];

export default function CustomFurniture({ navigate }: CustomFurnitureProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addRequest } = useCustomRequests();

  // Form state
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    furnitureType: '',
    width: '',
    height: '',
    depth: '',
    unit: 'cm',
    material: '',
    color: '',
    features: [] as string[],
    notes: '',
    budget: '',
    timeline: '',
    referenceImages: [] as string[],
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (featureId: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter((f) => f !== featureId)
        : [...prev.features, featureId],
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const request: CustomFurnitureRequest = {
      id: `REQ-${Date.now()}`,
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      furnitureType: formData.furnitureType,
      dimensions: formData.width
        ? {
            width: parseFloat(formData.width),
            height: parseFloat(formData.height) || 0,
            depth: parseFloat(formData.depth) || 0,
            unit: formData.unit,
          }
        : undefined,
      material: formData.material,
      color: formData.color,
      features: formData.features,
      referenceImages: formData.referenceImages,
      notes: formData.notes,
      budget: formData.budget ? parseFloat(formData.budget) : undefined,
      timeline: formData.timeline,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addRequest(request);
    
    toast.success('Your custom furniture request has been submitted! We will contact you within 24 hours.');
    setIsSubmitting(false);
    navigate('home');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.customerName && formData.email && formData.phone && formData.furnitureType;
      case 2:
        return true; // Size is optional
      case 3:
        return true; // Material and color are optional
      case 4:
        return true; // Features are optional
      case 5:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => updateFormData('customerName', e.target.value)}
                  placeholder="Your full name"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="your@email.com"
                  className="bg-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="+234 803 123 4567"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="furnitureType">Furniture Type *</Label>
              <Select
                value={formData.furnitureType}
                onValueChange={(value) => updateFormData('furnitureType', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select furniture type" />
                </SelectTrigger>
                <SelectContent>
                  {furnitureTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Description / Requirements</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
                placeholder="Describe what you're looking for..."
                className="bg-white min-h-[120px]"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-display font-semibold mb-4 block">Dimensions (Optional)</Label>
              <p className="text-ash/60 text-sm mb-6">
                Enter your desired dimensions or skip this step if you're unsure.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  type="number"
                  value={formData.width}
                  onChange={(e) => updateFormData('width', e.target.value)}
                  placeholder="0"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => updateFormData('height', e.target.value)}
                  placeholder="0"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="depth">Depth</Label>
                <Input
                  id="depth"
                  type="number"
                  value={formData.depth}
                  onChange={(e) => updateFormData('depth', e.target.value)}
                  placeholder="0"
                  className="bg-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Unit</Label>
              <div className="flex gap-4">
                {['cm', 'inches', 'feet'].map((unit) => (
                  <label key={unit} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="unit"
                      value={unit}
                      checked={formData.unit === unit}
                      onChange={(e) => updateFormData('unit', e.target.value)}
                      className="w-4 h-4 accent-ash"
                    />
                    <span className="text-ash/70 capitalize">{unit}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-display font-semibold mb-4 block">Materials & Colors</Label>
              <p className="text-ash/60 text-sm mb-6">
                Select your preferred materials and colors or leave it to our designers.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Preferred Material</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {materials.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => updateFormData('material', material.name)}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      formData.material === material.name
                        ? 'border-ash bg-ash text-beige'
                        : 'border-ash/20 bg-white text-ash hover:border-ash'
                    }`}
                  >
                    <div className="font-medium">{material.name}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Preferred Color</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => updateFormData('color', color.name)}
                    className={`p-4 rounded-lg border text-left transition-colors flex items-center gap-3 ${
                      formData.color === color.name
                        ? 'border-ash bg-ash text-beige'
                        : 'border-ash/20 bg-white text-ash hover:border-ash'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full border border-ash/20"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-medium">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-display font-semibold mb-4 block">Special Features</Label>
              <p className="text-ash/60 text-sm mb-6">
                Select any additional features you'd like for your furniture.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {specialFeatures.map((feature) => (
                <label
                  key={feature.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                    formData.features.includes(feature.id)
                      ? 'border-ash bg-ash/5'
                      : 'border-ash/20 bg-white hover:border-ash/40'
                  }`}
                >
                  <Checkbox
                    checked={formData.features.includes(feature.id)}
                    onCheckedChange={() => toggleFeature(feature.id)}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-ash">{feature.name}</div>
                    <div className="text-ash/60 text-sm">
                      +₦{feature.price.toLocaleString()}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range (Optional)</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => updateFormData('budget', e.target.value)}
                placeholder="Enter your budget in NGN"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Desired Timeline (Optional)</Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => updateFormData('timeline', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                  <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                  <SelectItem value="1-2-months">1-2 months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-display font-semibold mb-4 block">Review Your Request</Label>
              <p className="text-ash/60 text-sm mb-6">
                Please review your custom furniture request before submitting.
              </p>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-ash/60 text-sm">Name</span>
                    <p className="font-medium text-ash">{formData.customerName}</p>
                  </div>
                  <div>
                    <span className="text-ash/60 text-sm">Contact</span>
                    <p className="font-medium text-ash">{formData.email} | {formData.phone}</p>
                  </div>
                </div>
                <div className="border-t border-ash/10 pt-4">
                  <span className="text-ash/60 text-sm">Furniture Type</span>
                  <p className="font-medium text-ash">{formData.furnitureType}</p>
                </div>
                {(formData.width || formData.height || formData.depth) && (
                  <div className="border-t border-ash/10 pt-4">
                    <span className="text-ash/60 text-sm">Dimensions</span>
                    <p className="font-medium text-ash">
                      {formData.width && `W: ${formData.width}${formData.unit} `}
                      {formData.height && `H: ${formData.height}${formData.unit} `}
                      {formData.depth && `D: ${formData.depth}${formData.unit}`}
                    </p>
                  </div>
                )}
                {(formData.material || formData.color) && (
                  <div className="border-t border-ash/10 pt-4">
                    <span className="text-ash/60 text-sm">Material & Color</span>
                    <p className="font-medium text-ash">
                      {formData.material && `${formData.material}`}
                      {formData.material && formData.color && ' - '}
                      {formData.color && `${formData.color}`}
                    </p>
                  </div>
                )}
                {formData.features.length > 0 && (
                  <div className="border-t border-ash/10 pt-4">
                    <span className="text-ash/60 text-sm">Special Features</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.features.map((featureId) => {
                        const feature = specialFeatures.find((f) => f.id === featureId);
                        return feature ? (
                          <span key={featureId} className="px-3 py-1 bg-ash/10 rounded-full text-sm text-ash">
                            {feature.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                {formData.notes && (
                  <div className="border-t border-ash/10 pt-4">
                    <span className="text-ash/60 text-sm">Additional Notes</span>
                    <p className="font-medium text-ash">{formData.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-beige pb-20">
      {/* Header */}
      <div className="bg-beige-light border-b border-ash/10">
        <div className="container-wide py-8 md:py-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ash mb-4">
            Custom Furniture
          </h1>
          <p className="text-ash/70 max-w-xl">
            Design your perfect piece. Tell us what you envision, and our craftsmen will bring it to life.
          </p>
        </div>
      </div>

      <div className="container-wide py-8 md:py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex flex-col items-center ${
                    step.id === currentStep
                      ? 'text-ash'
                      : step.id < currentStep
                      ? 'text-brand-green'
                      : 'text-ash/30'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 ${
                      step.id === currentStep
                        ? 'border-ash bg-ash text-beige'
                        : step.id < currentStep
                        ? 'border-brand-green bg-brand-green text-white'
                        : 'border-ash/30 text-ash/30'
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 md:w-24 h-0.5 mx-2 ${
                      step.id < currentStep ? 'bg-brand-green' : 'bg-ash/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white">
            <CardContent className="p-6 md:p-10">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-10 pt-6 border-t border-ash/10">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="border-ash text-ash"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                {currentStep < steps.length ? (
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="bg-ash text-beige hover:bg-ash-light"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-brand-green text-white hover:bg-brand-green/90"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
