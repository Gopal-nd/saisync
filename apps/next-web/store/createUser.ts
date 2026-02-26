import {create} from 'zustand'

const useCreateUser = create((set) => ({
    name: '',
    setName: (name: string) => set({name}),
    email: '',
    setEmail: (email: string) => set({email}),
    password: '',
    setPassword: (password: string) => set({password}),
    confirmPassword: '',
    setConfirmPassword: (confirmPassword: string) => set({confirmPassword}),
    usn: '',
    setUsn: (usn: string) => set({usn}),
    branch: '',
    setBranch: (branch: string) => set({branch}),
    semester: '',
    setSemester: (semester: string) => set({semester}),
    section: '',
    setSection: (section: string) => set({section}),
    schema: '',
    setSchema: (schema: string) => set({schema})
}))