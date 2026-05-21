export interface Interface_of_user {
    name: string,
    email: string,
    password: string,
    role: "contributor" | "maintainer",
    is_active: boolean
}