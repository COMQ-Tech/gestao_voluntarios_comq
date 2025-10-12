"use client";
import React from "react";
import { UserForm } from "@/components/user-form/user-form";
import type { UserFormSchema } from "@/components/user-form/user-form.schema";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

export default function UserCreation() {
	function handleSubmit(data: UserFormSchema) {
		console.log("data: ", data);
	}

	return (
		<div className="flex flex-col flex-1">
			<header className="flex items-center justify-between p-4 border-b border-muted">
				<h1 className="text-lg font-semibold">Cadastro de Usuário</h1>

				<NavLink to="/admin/users">
					<Button type="button" variant="outline">
						Voltar
					</Button>
				</NavLink>
			</header>

			<main className="flex-1 overflow-auto p-6">
				<UserForm onSubmit={handleSubmit} />
			</main>
		</div>
	);
}
