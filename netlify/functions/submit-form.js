const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Parse form data (application/x-www-form-urlencoded)
  const params = new URLSearchParams(event.body);
  const data = Object.fromEntries(params.entries());

  // Remove honeypot and internal fields
  delete data['bot-field'];
  delete data['form-name'];

  // Format into readable email
  const fieldLabels = {
    airbnb_url: 'Airbnb URL',
    vrbo_url: 'VRBO URL',
    first_name: 'First Name',
    last_name: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    contact_pref: 'Preferred Contact',
    timezone: 'Timezone',
    property_name: 'Property Name',
    property_address: 'Property Address',
    city: 'City',
    state: 'State',
    zip: 'Zip',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    max_guests: 'Max Guests',
    property_type: 'Property Type',
    booking_platforms: 'Booking Platforms',
    has_direct_booking: 'Has Direct Booking',
    direct_booking_url: 'Direct Booking URL',
    brand_name: 'Brand Name',
    brand_vibe: 'Brand Vibe',
    guest_avatar: 'Guest Avatar',
    property_tagline: 'Tagline',
    brand_colors: 'Brand Colors',
    logo_preference: 'Logo Preference',
    top_features: 'Top Features',
    top_attractions: 'Top Attractions',
    unique_selling_point: 'Unique Selling Point',
    instagram_handle: 'Instagram Handle',
    has_instagram: 'Has Instagram',
    content_approval: 'Content Approval Preference',
    social_goals: 'Social Goals',
    competitor_likes: 'Competitor Accounts They Like',
    current_occupancy: 'Current Occupancy Rate',
    target_occupancy: 'Target Occupancy Rate',
    biggest_challenge: 'Biggest Challenge',
    goals: 'Goals',
    package: 'Package Selected',
    promo_code: 'Promo Code',
    additional_notes: 'Additional Notes',
  };

  const rows = Object.entries(data)
    .filter(([, v]) => v && v.trim() !== '')
    .map(([k, v]) => {
      const label = fieldLabels[k] || k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      return `<tr><td style="padding:6px 12px;font-weight:600;color:#555;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f0f0f0">${label}</td><td style="padding:6px 12px;color:#222;border-bottom:1px solid #f0f0f0">${v.replace(/\n/g, '<br>')}</td></tr>`;
    })
    .join('');

  const html = `
    <div style="font-family:Inter,sans-serif;max-width:680px;margin:0 auto">
      <div style="background:#0B1120;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:#00C9A7;font-size:1.4rem;margin:0">🎉 New Launchstr Intake Submission</h1>
        <p style="color:#8a93a8;margin:4px 0 0;font-size:0.9rem">Submitted via launchstr.io/form</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 12px 12px">
        ${rows}
      </table>
      <p style="color:#aaa;font-size:0.8rem;text-align:center;margin-top:16px">Launchstr · Apache Legacy Group LLC</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: 'Launchstr <hello@launchstr.io>',
      to: 'aluzadre@gmail.com',
      replyTo: data.email || 'hello@launchstr.io',
      subject: `New intake: ${data.first_name || ''} ${data.last_name || ''} — ${data.property_name || data.city || 'New submission'}`.trim(),
      html,
    });

    return {
      statusCode: 302,
      headers: { Location: '/success.html' },
      body: '',
    };
  } catch (err) {
    console.error('Resend error:', err);
    return {
      statusCode: 302,
      headers: { Location: '/success.html' },
      body: '',
    };
  }
};
