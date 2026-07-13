import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Imported from your file explorer path

function PumpButton() {
  const [Power_state, setPower_state] = useState(false);

  // 1. Fetch the initial state from Supabase when the dashboard loads
  useEffect(() => {
    async function getInitialState() {
      try {
        const { data, error } = await supabase
          .from('devices')
          .select('is_on')
          .eq('device_name', 'smart_pump')
          .single(); // Pulls the single row object

        if (error) throw error;
        if (data) {
          setPower_state(data.is_on);
        }
      } catch (err) {
        console.error("Error loading initial pump state:", err.message);
      }
    }
    getInitialState();
  }, []);

  // 2. Modified function to update both the local state and Supabase
  async function changePumpState() {
    const nextState = !Power_state;
    
    // Update local UI immediately so it feels snappy
    setPower_state(nextState);

    try {
      const { error } = await supabase
        .from('devices')
        .update({ is_on: nextState })
        .eq('device_name', 'smart_pump');

      if (error) {
        // If the database fails, roll back the UI toggle to be safe
        setPower_state(Power_state);
        throw error;
      }
    } catch (err) {
      console.error("Error updating database:", err.message);
    }
  }

  return (
    <div className="pump-button-container">
      <h1>SMART PUMP</h1>
      <button 
        onClick={changePumpState}
        className={`pump-btn ${Power_state ? 'on' : 'off'}`}
      >
        {Power_state ? "TURN ON" : "TURN OFF"}
      </button>
    </div>
  );
}

export default PumpButton;