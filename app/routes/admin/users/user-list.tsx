"use client";
import React from "react";
import type { UserFormSchema } from "@/components/user-form/user-form.schema";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

export default function UserList() {
	function handleSubmit(data: UserFormSchema) {
		console.log("data: ", data);
	}

	return (
		<div className="flex flex-col flex-1">
			<header className="flex items-center justify-between p-4 border-b border-muted">
				<h1 className="text-lg font-semibold">Lista de Usuários</h1>

				<NavLink to="/admin/users/new">
					<Button type="button">Cadastrar Usuário</Button>
				</NavLink>
			</header>

			<main className="flex-1 overflow-auto p-6"></main>
		</div>
	);
}
