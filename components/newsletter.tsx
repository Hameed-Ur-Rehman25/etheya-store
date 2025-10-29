'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SectionContainer } from './section-container'
import { useToast } from '@/hooks/use-toast'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      // Call the API to subscribe
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 409) {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter",
            variant: "destructive"
          })
        } else {
          toast({
            title: "Subscription failed",
            description: data.error || "Please try again later",
            variant: "destructive"
          })
        }
        return
      }

      // Success
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter. You'll receive updates about our latest collections and exclusive offers.",
      })
      
      setEmail('')
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      toast({
        title: "Subscription failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionContainer background="gray" padding="lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          WHAT ARE YOU WAITING FOR
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about our latest collections, 
          exclusive offers, and fashion updates.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex space-x-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
        </form>
      </div>
    </SectionContainer>
  )
}
