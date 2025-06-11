"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"

export default function DaftarPage() {
  const [nama, setNama] = useState("")
  const [formData, setFormData] = useState({
    matematika: "",
    ipa: "",
    ips: "",
    bindo: "",
    jarak: "",
  })
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/siswa")
      return
    }
    setNama(currentUser)
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      nama,
      matematika: Number.parseInt(formData.matematika),
      ipa: Number.parseInt(formData.ipa),
      ips: Number.parseInt(formData.ips),
      bindo: Number.parseInt(formData.bindo),
      jarak: Number.parseFloat(formData.jarak),
    }

    const pendaftarList = JSON.parse(localStorage.getItem("pendaftarList") || "[]")
    pendaftarList.push(data)
    localStorage.setItem("pendaftarList", JSON.stringify(pendaftarList))

    setSuccess(true)
    setTimeout(() => {
      router.push("/siswa/menu")
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!nama) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/siswa/menu">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Menu
            </Button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-slate-200">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Formulir Pendaftaran</CardTitle>
              <CardDescription className="text-slate-600">
                Lengkapi data nilai dan informasi pendukung Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-700">
                    Pendaftaran berhasil! Anda akan diarahkan kembali ke menu utama...
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="matematika" className="text-slate-700">
                        Nilai Matematika
                      </Label>
                      <Input
                        id="matematika"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.matematika}
                        onChange={(e) => handleInputChange("matematika", e.target.value)}
                        placeholder="0-100"
                        className="border-slate-300 focus:border-green-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ipa" className="text-slate-700">
                        Nilai IPA
                      </Label>
                      <Input
                        id="ipa"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.ipa}
                        onChange={(e) => handleInputChange("ipa", e.target.value)}
                        placeholder="0-100"
                        className="border-slate-300 focus:border-green-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ips" className="text-slate-700">
                        Nilai IPS
                      </Label>
                      <Input
                        id="ips"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.ips}
                        onChange={(e) => handleInputChange("ips", e.target.value)}
                        placeholder="0-100"
                        className="border-slate-300 focus:border-green-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bindo" className="text-slate-700">
                        Nilai Bahasa Indonesia
                      </Label>
                      <Input
                        id="bindo"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.bindo}
                        onChange={(e) => handleInputChange("bindo", e.target.value)}
                        placeholder="0-100"
                        className="border-slate-300 focus:border-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jarak" className="text-slate-700">
                      Jarak ke Sekolah (km)
                    </Label>
                    <Input
                      id="jarak"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.jarak}
                      onChange={(e) => handleInputChange("jarak", e.target.value)}
                      placeholder="Contoh: 2.5"
                      className="border-slate-300 focus:border-green-500"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Daftar Sekarang
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
