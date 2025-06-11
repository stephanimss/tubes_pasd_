import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">smaPredict</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Platform digital untuk memprediksi peluang penerimaan siswa SMA
          </p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Silakan pilih peran Anda untuk melanjutkan
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-slate-200">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Siswa</CardTitle>
              <CardDescription className="text-slate-600">
                Daftar sebagai calon siswa baru atau simulasi nilai
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/siswa">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Masuk sebagai Siswa</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-slate-200">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Guru</CardTitle>
              <CardDescription className="text-slate-600">Akses data pendaftar dan kelola sistem PPDB</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/guru">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Masuk sebagai Guru</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
