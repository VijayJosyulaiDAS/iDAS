import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import axios, { AxiosError } from 'axios';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import { useAuth } from 'src/app/auth/AuthRouteProvider';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Form Validation Schema
 */
const schema = z.object({
	email: z.string().email('You must enter a valid email').nonempty('You must enter an email'),
	password: z
		.string()
		.min(4, 'Password is too short - must be at least 4 chars.')
		.nonempty('Please enter your password.')
});

type FormType = {
	email: string;
	password: string;
	remember?: boolean;
};

const defaultValues = {
	email: '',
	password: '',
	remember: true
};

function PingFedSignInTab() {
	const { pingService } = useAuth();

	const { control, formState, handleSubmit, setValue, setError } = useForm<FormType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		setValue('email', 'admin@fusetheme.com', { shouldDirty: true, shouldValidate: true });
		setValue('password', 'admin', { shouldDirty: true, shouldValidate: true });
	}, [setValue]);

	useEffect(() => {		
		const fetchData = async () => {
			const response = await axios.post(`/api/is_logged_in`);
			const {data} = response;
			if(!data.trigger){
				console.log('please logged in')
 			} else {
				const {trigger, user} = data;
				console.log(trigger)
				pingService.signIn({email: JSON.stringify(user.profile)})
				.catch(
					(
						error: AxiosError<
							{
								type: 'email' | 'password' | 'remember' | `root.${string}` | 'root';
								message: string;
							}[]
						>
					) => {
						const errorData = error.response.data;
						localStorage.setItem('error', JSON.stringify(errorData))
						console.log(errorData)
						// errorData.forEach((err) => {
						// 	setError(err.type, {
						// 		type: 'manual',
						// 		message: err.message
						// 	});
						// });
					}
				);
			}
		}

		fetchData();
	}, []);

	return (
		<div className="flex justify-between items-center">
			<div className="p2">
				<form className="form-horizontal">
					<div className="form-group row mb-0 mt-60">
						<div className="col-12 items-center flex justify-center">
							<img src='assets/images/png/pingid_banner.png' alt={"banner"} />
						</div>
						<div className="col-12 text-center border border-2 border-red p-16 mx-auto">
							<a className="btn btn-outline-danger"
							   href="api/ping/oauth2" type="submit"
							   style={{textDecoration: 'none', color: 'red'}}
							>
								Employee Login
							</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default PingFedSignInTab;
