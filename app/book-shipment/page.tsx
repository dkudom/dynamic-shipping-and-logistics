"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  ArrowRight,
  Box,
  Calendar,
  ChevronLeft,
  Clock,
  CreditCard,
  Home,
  Info,
  MapPin,
  Package,
  Truck,
  Weight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"
import { Separator } from "@/components/ui/separator"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { useToast } from "@/components/ui/use-toast"
import { useSupabaseAuth } from "@/lib/supabase-auth"
import { ShipmentService } from "@/lib/db-service"
import { generateTrackingNumber } from "@/lib/utils"

const formSchema = z.object({
  // Sender information
  senderName: z.string().min(2, "Name must be at least 2 characters"),
  senderEmail: z.string().email("Please enter a valid email"),
  senderPhone: z.string().min(10, "Please enter a valid phone number"),
  senderAddress: z.string().min(5, "Address must be at least 5 characters"),
  senderCity: z.string().min(2, "City is required"),
  senderState: z.string().min(2, "State is required"),
  senderPostalCode: z.string().min(5, "Postal code is required"),
  senderCountry: z.string().min(2, "Country is required"),
  
  // Recipient information
  recipientName: z.string().min(2, "Name must be at least 2 characters"),
  recipientEmail: z.string().email("Please enter a valid email"),
  recipientPhone: z.string().min(10, "Please enter a valid phone number"),
  recipientAddress: z.string().min(5, "Address must be at least 5 characters"),
  recipientCity: z.string().min(2, "City is required"),
  recipientState: z.string().min(2, "State is required"),
  recipientPostalCode: z.string().min(5, "Postal code is required"),
  recipientCountry: z.string().min(2, "Country is required"),
  
  // Package details
  packageType: z.string().min(1, "Package type is required"),
  weight: z.string().min(1, "Weight is required"),
  weightUnit: z.string().min(1, "Weight unit is required"),
  length: z.string().min(1, "Length is required"),
  width: z.string().min(1, "Width is required"),
  height: z.string().min(1, "Height is required"),
  dimensionUnit: z.string().min(1, "Dimension unit is required"),
  contents: z.string().min(2, "Please describe the package contents"),
  declaredValue: z.string().min(1, "Declared value is required"),
  
  // Shipping options
  serviceType: z.string().min(1, "Service type is required"),
  pickupDate: z.date({
    required_error: "Please select a pickup date",
  }),
  insurance: z.boolean().default(false),
  signatureRequired: z.boolean().default(false),
})

export default function BookShipmentPage() {
  const { toast } = useToast()
  const { user } = useSupabaseAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingRate, setShippingRate] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderName: "",
      senderEmail: "",
      senderPhone: "",
      senderAddress: "",
      senderCity: "",
      senderState: "",
      senderPostalCode: "",
      senderCountry: "United States",
      
      recipientName: "",
      recipientEmail: "",
      recipientPhone: "",
      recipientAddress: "",
      recipientCity: "",
      recipientState: "",
      recipientPostalCode: "",
      recipientCountry: "United States",
      
      packageType: "",
      weight: "",
      weightUnit: "lb",
      length: "",
      width: "",
      height: "",
      dimensionUnit: "in",
      contents: "",
      declaredValue: "",
      
      serviceType: "",
      insurance: false,
      signatureRequired: false,
    }
  })
  
  const nextStep = () => {
    if (currentStep === 1) {
      form.trigger(['senderName', 'senderEmail', 'senderPhone', 'senderAddress', 'senderCity', 'senderState', 'senderPostalCode', 'senderCountry'])
      
      const senderErrors = [
        'senderName', 'senderEmail', 'senderPhone', 'senderAddress', 'senderCity', 'senderState', 'senderPostalCode', 'senderCountry'
      ].some(field => !!form.formState.errors[field as keyof z.infer<typeof formSchema>])
      
      if (!senderErrors) {
        setCurrentStep(2)
      }
    } else if (currentStep === 2) {
      form.trigger(['recipientName', 'recipientEmail', 'recipientPhone', 'recipientAddress', 'recipientCity', 'recipientState', 'recipientPostalCode', 'recipientCountry'])
      
      const recipientErrors = [
        'recipientName', 'recipientEmail', 'recipientPhone', 'recipientAddress', 'recipientCity', 'recipientState', 'recipientPostalCode', 'recipientCountry'
      ].some(field => !!form.formState.errors[field as keyof z.infer<typeof formSchema>])
      
      if (!recipientErrors) {
        setCurrentStep(3)
      }
    } else if (currentStep === 3) {
      form.trigger(['packageType', 'weight', 'weightUnit', 'length', 'width', 'height', 'dimensionUnit', 'contents', 'declaredValue'])
      
      const packageErrors = [
        'packageType', 'weight', 'weightUnit', 'length', 'width', 'height', 'dimensionUnit', 'contents', 'declaredValue'
      ].some(field => !!form.formState.errors[field as keyof z.infer<typeof formSchema>])
      
      if (!packageErrors) {
        // Calculate shipping rate based on package details
        calculateShippingRate()
        setCurrentStep(4)
      }
    }
  }
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const calculateShippingRate = () => {
    // This would normally call an API with the package details
    // Mock calculation for demonstration
    const weight = parseFloat(form.getValues('weight'))
    const length = parseFloat(form.getValues('length'))
    const width = parseFloat(form.getValues('width'))
    const height = parseFloat(form.getValues('height'))
    
    // Basic rate calculation (just for demo)
    const volume = length * width * height
    const baseRate = weight * 2.5
    const volumeRate = volume * 0.1
    
    setShippingRate(baseRate + volumeRate)
  }
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to book a shipment",
        variant: "destructive"
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Generate a tracking number
      const trackingNumber = generateTrackingNumber()
      
      // Format the package dimensions
      const dimensions = `${values.length}x${values.width}x${values.height} ${values.dimensionUnit}`
      
      // Format the addresses
      const originAddress = `${values.senderAddress}, ${values.senderCity}, ${values.senderState} ${values.senderPostalCode}, ${values.senderCountry}`
      const destinationAddress = `${values.recipientAddress}, ${values.recipientCity}, ${values.recipientState} ${values.recipientPostalCode}, ${values.recipientCountry}`
      
      // Create the shipment in Supabase
      await ShipmentService.create({
        user_id: user.id,
        tracking_number: trackingNumber,
        status: 'pending',
        origin_address: originAddress,
        destination_address: destinationAddress,
        package_weight: parseFloat(values.weight),
        package_dimensions: dimensions,
        shipping_method: values.serviceType,
        estimated_delivery: new Date(values.pickupDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Estimate delivery date as 7 days after pickup
      })
      
      toast({
        title: "Shipment Created",
        description: `Your shipment has been successfully booked. Tracking ID: ${trackingNumber}`,
      })
      
      // Reset form or redirect
      form.reset()
      setCurrentStep(1)
    } catch (error) {
      console.error("Error creating shipment:", error)
      toast({
        title: "Error",
        description: "Failed to create shipment. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <DashboardNavbar />
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center text-muted-foreground hover:text-primary">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Book a Shipment</h1>
          <p className="mt-2 text-muted-foreground">
            Fill out the form below to book a new shipment. All fields marked with an asterisk (*) are required.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                currentStep >= 1 ? "bg-primary text-primary-foreground" : "border-border"
              }`}>
                1
              </div>
              <span className={currentStep >= 1 ? "font-medium" : "text-muted-foreground"}>Sender</span>
            </div>
            <Separator className="flex-1" />
            <div className="flex items-center space-x-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                currentStep >= 2 ? "bg-primary text-primary-foreground" : "border-border"
              }`}>
                2
              </div>
              <span className={currentStep >= 2 ? "font-medium" : "text-muted-foreground"}>Recipient</span>
            </div>
            <Separator className="flex-1" />
            <div className="flex items-center space-x-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                currentStep >= 3 ? "bg-primary text-primary-foreground" : "border-border"
              }`}>
                3
              </div>
              <span className={currentStep >= 3 ? "font-medium" : "text-muted-foreground"}>Package</span>
            </div>
            <Separator className="flex-1" />
            <div className="flex items-center space-x-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                currentStep >= 4 ? "bg-primary text-primary-foreground" : "border-border"
              }`}>
                4
              </div>
              <span className={currentStep >= 4 ? "font-medium" : "text-muted-foreground"}>Shipping Options</span>
            </div>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Step 1: Sender Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="mr-2 h-5 w-5" />
                    Sender Information
                  </CardTitle>
                  <CardDescription>
                    Enter the details of the person sending the package
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="senderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="senderEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="senderPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number*</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="senderAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address*</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="senderCity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City*</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="senderState"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province*</FormLabel>
                          <FormControl>
                            <Input placeholder="NY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="senderPostalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code*</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="senderCountry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="United States">United States</SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                              <SelectItem value="Australia">Australia</SelectItem>
                              <SelectItem value="Germany">Germany</SelectItem>
                              <SelectItem value="France">France</SelectItem>
                              <SelectItem value="Japan">Japan</SelectItem>
                              <SelectItem value="China">China</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="button" onClick={nextStep} className="ml-auto">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Step 2: Recipient Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Recipient Information
                  </CardTitle>
                  <CardDescription>
                    Enter the details of the person receiving the package
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="recipientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="recipientEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input placeholder="jane.smith@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="recipientPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number*</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 987-6543" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="recipientAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address*</FormLabel>
                        <FormControl>
                          <Input placeholder="456 Oak Ave" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="recipientCity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City*</FormLabel>
                          <FormControl>
                            <Input placeholder="Los Angeles" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="recipientState"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province*</FormLabel>
                          <FormControl>
                            <Input placeholder="CA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="recipientPostalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code*</FormLabel>
                          <FormControl>
                            <Input placeholder="90001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="recipientCountry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="United States">United States</SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                              <SelectItem value="Australia">Australia</SelectItem>
                              <SelectItem value="Germany">Germany</SelectItem>
                              <SelectItem value="France">France</SelectItem>
                              <SelectItem value="Japan">Japan</SelectItem>
                              <SelectItem value="China">China</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Step 3: Package Details */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="mr-2 h-5 w-5" />
                    Package Details
                  </CardTitle>
                  <CardDescription>
                    Provide information about your package
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="packageType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Package Type*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select package type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="box">Box</SelectItem>
                            <SelectItem value="envelope">Envelope</SelectItem>
                            <SelectItem value="tube">Tube</SelectItem>
                            <SelectItem value="pallet">Pallet</SelectItem>
                            <SelectItem value="customPackage">Custom Package</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight*</FormLabel>
                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormField
                              control={form.control}
                              name="weightUnit"
                              render={({ field }) => (
                                <FormItem>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="w-20">
                                        <SelectValue placeholder="Unit" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="lb">lb</SelectItem>
                                      <SelectItem value="kg">kg</SelectItem>
                                      <SelectItem value="oz">oz</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="length"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Length*</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width*</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height*</FormLabel>
                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormField
                              control={form.control}
                              name="dimensionUnit"
                              render={({ field }) => (
                                <FormItem>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="w-20">
                                        <SelectValue placeholder="Unit" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="in">in</SelectItem>
                                      <SelectItem value="cm">cm</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="contents"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Package Contents*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the contents of your package" 
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Please provide an accurate description of the items in your package.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="declaredValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Declared Value (USD)*</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="100" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the value of the package contents for customs and insurance purposes.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Step 4: Shipping Options */}
            {currentStep === 4 && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Truck className="mr-2 h-5 w-5" />
                        Shipping Options
                      </CardTitle>
                      <CardDescription>
                        Select your shipping service and options
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Service Type*</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-3"
                              >
                                <div className="flex items-center space-x-3 rounded-md border p-4">
                                  <RadioGroupItem value="express" id="express" />
                                  <Label htmlFor="express" className="flex flex-col">
                                    <span className="font-medium">Express (1-2 Business Days)</span>
                                    <span className="text-sm text-muted-foreground">
                                      Guaranteed delivery within 1-2 business days
                                    </span>
                                  </Label>
                                  <div className="ml-auto font-medium">₵49.99</div>
                                </div>
                                <div className="flex items-center space-x-3 rounded-md border p-4">
                                  <RadioGroupItem value="priority" id="priority" />
                                  <Label htmlFor="priority" className="flex flex-col">
                                    <span className="font-medium">Priority (2-3 Business Days)</span>
                                    <span className="text-sm text-muted-foreground">
                                      Expedited shipping with tracking
                                    </span>
                                  </Label>
                                  <div className="ml-auto font-medium">₵24.99</div>
                                </div>
                                <div className="flex items-center space-x-3 rounded-md border p-4">
                                  <RadioGroupItem value="standard" id="standard" />
                                  <Label htmlFor="standard" className="flex flex-col">
                                    <span className="font-medium">Standard (3-5 Business Days)</span>
                                    <span className="text-sm text-muted-foreground">
                                      Regular shipping with tracking
                                    </span>
                                  </Label>
                                  <div className="ml-auto font-medium">₵12.99</div>
                                </div>
                                <div className="flex items-center space-x-3 rounded-md border p-4">
                                  <RadioGroupItem value="economy" id="economy" />
                                  <Label htmlFor="economy" className="flex flex-col">
                                    <span className="font-medium">Economy (5-7 Business Days)</span>
                                    <span className="text-sm text-muted-foreground">
                                      Cost-effective option for non-urgent shipments
                                    </span>
                                  </Label>
                                  <div className="ml-auto font-medium">₵7.99</div>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="pickupDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Pickup Date*</FormLabel>
                            <DatePicker
                              date={field.value}
                              setDate={field.onChange}
                            />
                            <FormDescription>
                              Select the date when the package will be ready for pickup.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Additional Services</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="insurance"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">
                                    Shipping Insurance
                                  </FormLabel>
                                  <FormDescription>
                                    Covers loss or damage up to the declared value
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="signatureRequired"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">
                                    Signature Required
                                  </FormLabel>
                                  <FormDescription>
                                    Recipient must sign for delivery
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                      <Button type="submit">
                        Book Shipment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Base Shipping Rate</span>
                          <span>₵{shippingRate.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Additional Services</span>
                          <span>₵0.00</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Tax</span>
                          <span>₵{(shippingRate * 0.1).toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between font-medium">
                          <span>Total</span>
                          <span>₵{(shippingRate * 1.1).toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-muted p-4 text-sm">
                        <div className="flex items-start space-x-2">
                          <Info className="mt-0.5 h-4 w-4 text-muted-foreground" />
                          <div>
                            <p>Estimated delivery time is based on the service selected and may vary.</p>
                            <p className="mt-2">Payment will be processed after shipment confirmation.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
} 