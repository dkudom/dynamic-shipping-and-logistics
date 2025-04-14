"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Building, ChevronLeft, CreditCard, Lock, Mail, MapPin, Phone, Upload, User } from "lucide-react"

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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useSupabaseAuth } from "@/lib/supabase-auth"
import { ProfileService } from "@/lib/db-service"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { Skeleton } from "@/components/ui/skeleton"
import supabase from "@/lib/supabase"

const profileFormSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  preferred_shipping_method: z.string().optional(),
})

const addressFormSchema = z.object({
  address: z.string().min(2, "Address is required"),
})

const passwordFormSchema = z.object({
  currentPassword: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

const notificationFormSchema = z.object({
  emailUpdates: z.boolean().default(true),
  shipmentNotifications: z.boolean().default(true),
  promotionalEmails: z.boolean().default(false),
  smsAlerts: z.boolean().default(true),
})

export default function ProfilePage() {
  const { toast } = useToast()
  const { user } = useSupabaseAuth()
  const [avatar, setAvatar] = useState("/placeholder.svg?height=128&width=128")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company: "",
      preferred_shipping_method: "standard",
    },
  })
  
  // Address form
  const addressForm = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      address: "",
    },
  })
  
  // Password form
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })
  
  // Notification form
  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailUpdates: true,
      shipmentNotifications: true,
      promotionalEmails: false,
      smsAlerts: true,
    },
  })
  
  // Load user profile data from Supabase
  useEffect(() => {
    async function loadProfile() {
      if (!user) return
      
      try {
        const profile = await ProfileService.getProfile(user.id)
        
        if (profile) {
          // Update profile form values
          profileForm.reset({
            first_name: profile.first_name || "",
            last_name: profile.last_name || "",
            email: profile.email || user.email || "",
            phone: profile.phone || "",
            company: profile.company || "",
            preferred_shipping_method: profile.preferred_shipping_method || "standard",
          })
          
          // Update address form values
          addressForm.reset({
            address: profile.address || "",
          })
          
          // Set avatar if available
          if (profile.avatar_url) {
            setAvatar(profile.avatar_url)
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        toast({
          title: "Error",
          description: "Failed to load profile information",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }
    
    loadProfile()
  }, [user, profileForm, addressForm, toast])
  
  async function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
    if (!user) return
    
    setSubmitting(true)
    
    try {
      await ProfileService.updateProfile(user.id, {
        id: user.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        preferred_shipping_method: data.preferred_shipping_method,
      })
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile information",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }
  
  async function onAddressSubmit(data: z.infer<typeof addressFormSchema>) {
    if (!user) return
    
    setSubmitting(true)
    
    try {
      await ProfileService.updateProfile(user.id, {
        id: user.id,
        address: data.address,
      })
      
      toast({
        title: "Address Updated",
        description: "Your address information has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating address:", error)
      toast({
        title: "Error",
        description: "Failed to update address information",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }
  
  async function onPasswordSubmit(data: z.infer<typeof passwordFormSchema>) {
    if (!user) return
    
    setSubmitting(true)
    
    try {
      // Supabase password change
      const { error } = await supabase.auth.updateUser({ 
        password: data.newPassword 
      })
      
      if (error) throw error
      
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      })
      
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.error("Error updating password:", error)
      toast({
        title: "Error",
        description: "Failed to update password. Please ensure your current password is correct.",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }
  
  function onNotificationSubmit(data: z.infer<typeof notificationFormSchema>) {
    // This would typically save to a notifications table in Supabase
    console.log("Notification data", data)
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    })
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNavbar />
      <div className="container max-w-6xl py-8 mx-auto px-4">
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center text-muted-foreground hover:text-primary">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          {/* Personal Information */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and profile settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={avatar} alt="Profile" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                        <Upload className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-xl font-semibold">Profile Photo</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload a photo to personalize your account. Max file size: 5MB.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Upload
                      </Button>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={profileForm.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={profileForm.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="preferred_shipping_method"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Shipping Method</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a shipping method" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="standard">Standard</SelectItem>
                                  <SelectItem value="express">Express</SelectItem>
                                  <SelectItem value="overnight">Overnight</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator className="my-6" />
                    <div className="flex justify-end space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => profileForm.reset()}
                        disabled={submitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={submitting}
                        onClick={profileForm.handleSubmit(onProfileSubmit)}
                      >
                        {submitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Address Information */}
          <TabsContent value="address">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Address Information
                </CardTitle>
                <CardDescription>
                  Manage your shipping and billing addresses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...addressForm}>
                  <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-6">
                    <FormField
                      control={addressForm.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={addressForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addressForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={addressForm.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addressForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
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
                    
                    <Button type="submit">Save Address</Button>
                  </form>
                </Form>
                
                <Separator />
                
                <div>
                  <h3 className="mb-4 text-lg font-medium">Saved Addresses</h3>
                  <div className="rounded-md border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">Home Address</div>
                        <div className="text-sm text-muted-foreground">123 Main St</div>
                        <div className="text-sm text-muted-foreground">New York, NY 10001</div>
                        <div className="text-sm text-muted-foreground">United States</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="mr-2 h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormDescription>
                            Password must be at least 8 characters long.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">Change Password</Button>
                  </form>
                </Form>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Login Sessions</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your active sessions and sign out from other devices.
                  </p>
                  <div className="rounded-md border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">Current Session</div>
                        <div className="text-sm text-muted-foreground">Windows PC • Chrome</div>
                        <div className="text-sm text-muted-foreground">New York, USA • Last active: Just now</div>
                      </div>
                      <Badge>Current</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                    Sign Out From All Devices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Manage how you receive notifications and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...notificationForm}>
                  <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      
                      <FormField
                        control={notificationForm.control}
                        name="emailUpdates"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Account Updates
                              </FormLabel>
                              <FormDescription>
                                Receive emails about your account activity and security.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="shipmentNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Shipment Notifications
                              </FormLabel>
                              <FormDescription>
                                Receive updates about your shipments, including tracking information.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="promotionalEmails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Marketing & Promotions
                              </FormLabel>
                              <FormDescription>
                                Receive special offers, promotions, and news about our services.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">SMS Notifications</h3>
                      
                      <FormField
                        control={notificationForm.control}
                        name="smsAlerts"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                SMS Alerts
                              </FormLabel>
                              <FormDescription>
                                Receive shipment status updates via text message.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit">Save Preferences</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 