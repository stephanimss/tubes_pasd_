"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, User } from "lucide-react"
import Link from "next/link"

export default function SiswaLogin() {
  const [nama, setNama] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nama.trim()) {
      setError("Nama tidak boleh kosong.")
      return
    }

    // Store in localStorage for demo purposes
    localStorage.setItem("currentUser", nama.trim())

    // Get existing registered names
    const registeredNames = JSON.parse(localStorage.getItem("registeredNames") || "[]")
    if (!registeredNames.includes(nama.trim())) {
      registeredNames.push(nama.trim())
      localStorage.setItem("registeredNames", JSON.stringify(registeredNames))
    }

    router.push("/siswa/menu")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="shadow-lg border-slate-200">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Login Siswa</CardTitle>
              <CardDescription className="text-slate-600">Masukkan nama Anda untuk melanjutkan</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="nama" className="text-slate-700">
                    Nama Lengkap
                  </Label>
                  <Input
                    id="nama"
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama lengkap Anda"
                    className="border-slate-300 focus:border-blue-500"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Masuk
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
