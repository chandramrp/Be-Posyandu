import { Role, Status, User } from "@prisma/client";

export type UserResponse = {
	id: number;
	nama: string;
	email: string;
	role: Role;
	status: Status;
	token?: string;
};

export type CreateUserRequest = {
	nama: string;
	email: string;
	password: string;
	role: Role;
};

export type LoginUserRequest = {
	email: string;
	password: string;
};

export type UpdateUserRequest = {
	nama?: string;
	email?: string;
	password?: string;
	role?: Role;
	status?: Status;
};

export function toUserResponse(user: User): UserResponse {
	return {
		id: user.id,
		nama: user.nama,
		email: user.email,
		role: user.role,
		status: user.status,
	};
}
