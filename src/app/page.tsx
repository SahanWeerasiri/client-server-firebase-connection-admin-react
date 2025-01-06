'use client'

import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, onValue } from 'firebase/database'

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

export default function Home() {
  const [formData, setFormData] = useState({
    apiCall: '',
    path: '',
    phoneNumber: '',
    message: ''
  })
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    const dataRef = ref(database, 'messages')
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const dataArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }))
        setResults(dataArray)
      }
    })
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const dataRef = ref(database, 'messages')
    await push(dataRef, formData)
    setFormData({ apiCall: '', path: '', phoneNumber: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Firebase Realtime Database App</h1>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apiCall">
              API Call
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="apiCall"
              type="text"
              name="apiCall"
              value={formData.apiCall}
              onChange={handleInputChange}
              placeholder="Enter API call"
            />
          </div>
          <div className="mb-4">
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
          </div>
          <div className="mb-4">
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
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter message"
              rows={4}
            ></textarea>
          </div>
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
          {results.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {results.map((item) => (
                <li key={item.id} className="py-4">
                  <p className="text-sm font-medium text-gray-900">API Call: {item.apiCall}</p>
                  <p className="text-sm text-gray-500">Path: {item.path}</p>
                  <p className="text-sm text-gray-500">Phone Number: {item.phoneNumber}</p>
                  <p className="text-sm text-gray-500">Message: {item.message}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
      </div>
    </div>
  )
}

