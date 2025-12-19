// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface SubscriptionRequest {
  email: string;
}

interface MailchimpErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
}

interface MailchimpMember {
  id: string;
  email_address: string;
  status: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscriptionRequest = await request.json();
    const { email } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get Mailchimp environment variables
    const MAILCHIMP_API_KEY = process.env.MAIL_CHIMP_API_KEY;
    const MAILCHIMP_AUDIENCE_ID = process.env.MAIL_CHIMP_AUDIENCE_ID;
    const MAILCHIMP_DATA_CENTER = process.env.MAIL_CHIMP_DATA_CENTER;

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_DATA_CENTER) {
      console.error('Missing Mailchimp environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Construct Mailchimp API URL
    const mailchimpUrl = `https://${MAILCHIMP_DATA_CENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

    // Create member payload
    const memberData = {
      email_address: email,
      status: 'subscribed', // 'pending' for double opt-in, 'subscribed' for single opt-in
      merge_fields: {
        // Add any additional fields you want to capture
        // FNAME: firstName,
        // LNAME: lastName,
      }
    };

    const response = await fetch(mailchimpUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData),
    });

    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      const errorResponse = responseData as MailchimpErrorResponse;
      
      // Handle specific Mailchimp errors
      if (response.status === 400 && errorResponse.title === 'Member Exists') {
        // Check if the member is already subscribed
        const getMemberUrl = `https://${MAILCHIMP_DATA_CENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${Buffer.from(email.toLowerCase()).toString('hex')}`;
        
        const memberResponse = await fetch(getMemberUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
        });

        if (memberResponse.ok) {
          const memberData = await memberResponse.json() as MailchimpMember;
          
          if (memberData.status === 'subscribed') {
            return NextResponse.json({
              message: 'Email is already subscribed to our newsletter',
              status: 'already_subscribed'
            });
          } else if (memberData.status === 'unsubscribed') {
            // Resubscribe the user
            const updateUrl = `https://${MAILCHIMP_DATA_CENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${Buffer.from(email.toLowerCase()).toString('hex')}`;
            
            const updateResponse = await fetch(updateUrl, {
              method: 'PATCH',
              headers: {
                'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                status: 'subscribed'
              }),
            });

            if (updateResponse.ok) {
              return NextResponse.json({
                message: 'Successfully resubscribed to newsletter',
                status: 'resubscribed'
              });
            }
          }
        }
        
        return NextResponse.json({
          message: 'Email is already registered',
          status: 'already_exists'
        });
      }
      
      console.error('Mailchimp API error:', errorResponse);
      return NextResponse.json(
        { 
          error: errorResponse.detail || 'Failed to subscribe. Please try again.',
          mailchimpError: errorResponse.title 
        },
        { status: response.status }
      );
    }

    const memberResponse = responseData as MailchimpMember;

    return NextResponse.json({
      message: 'Successfully subscribed to newsletter',
      status: 'subscribed',
      memberId: memberResponse.id
    });

  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}