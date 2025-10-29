import { NextRequest, NextResponse } from 'next/server'
import DatabaseService from '@/lib/database-service'

// Security: Rate limiting headers
const RATE_LIMIT_HEADERS = {
  'X-RateLimit-Limit': '10',
  'X-RateLimit-Window': '1m',
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { email } = body

    // Validate email presence
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Save to database
    const { data, error } = await DatabaseService.createNewsletterSubscription(email)

    if (error) {
      // Handle duplicate email error
      if (error.code === 'DUPLICATE_EMAIL' || error.code === '23505') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'This email is already subscribed to our newsletter' 
          },
          { status: 409 }
        )
      }

      // Log error for debugging
      console.error('Newsletter subscription error:', error)

      // Return generic error to client
      return NextResponse.json(
        { success: false, error: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      )
    }

    // Success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter!',
        data 
      },
      { 
        status: 201,
        headers: RATE_LIMIT_HEADERS
      }
    )

  } catch (error) {
    console.error('Unexpected error in newsletter subscription:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  )
}

