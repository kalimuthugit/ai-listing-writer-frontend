'use client';

import { useState } from 'react';
import { Slider } from '@mui/material';

export default function Home() {
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [features, setFeatures] = useState('');
  const [temperature, setTemperature] = useState(0.3);
  const [listing, setListing] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ STREAMING GENERATION HANDLER
  const handleGenerate = async () => {
    setLoading(true);
    setListing('');

    try {
      const response = await fetch('/api/generate-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_type: propertyType,
          bedrooms,
          bathrooms,
          features,
          temperature
        }),
      });

      if (!response.body) {
        setListing('No response body received.');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let output = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        output += chunk;
        setListing(output); // live update text as it streams
      }
    } catch (error) {
      console.error(error);
      setListing('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Inter, sans-serif',
        background: '#F8FAFC',
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ color: '#00796B', fontSize: '2rem', fontWeight: 700 }}>
        🏡 AI Listing Writer
      </h1>

      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          marginTop: '1rem',
        }}
      >
        <h3>Property Details</h3>

        <label>Property Type</label>
        <input
          type="text"
          placeholder="e.g., House"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          style={{
            width: '100%',
            padding: '0.6rem',
            marginBottom: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label>Bedrooms</label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Bathrooms</label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>
        </div>

        <label style={{ marginTop: '0.8rem', display: 'block' }}>
          Key Features
        </label>
        <textarea
          rows={3}
          placeholder="e.g., Pool, Modern kitchen, Double garage"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          style={{
            width: '100%',
            padding: '0.6rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />

        <label style={{ marginTop: '1rem' }}>
          ✨ Creativity (Temperature): {temperature}
        </label>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={temperature}
          onChange={(e, newVal) => setTemperature(newVal as number)}
          valueLabelDisplay="auto"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#00796B',
            color: 'white',
            padding: '0.8rem',
            borderRadius: '8px',
            marginTop: '1rem',
            cursor: 'pointer',
            border: 'none',
            fontWeight: 600,
          }}
        >
          {loading ? 'Generating...' : '✨ Generate Listing'}
        </button>
      </div>

      {listing && (
        <div
          style={{
            width: '100%',
            maxWidth: '600px',
            background: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
            marginTop: '1.5rem',
          }}
        >
          <h3 style={{ color: '#00796B' }}>Generated Listing:</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{listing}</p>
        </div>
      )}
    </div>
  );
}
