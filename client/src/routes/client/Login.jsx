import {
	Box,
	Button,
	Paper,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useLoginUserMutation } from "../../features/apiSlice";
import { setUser } from "../../features/usersSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";

function Login() {
	const theme = useTheme();
	const [loginUser, { data }] = useLoginUserMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async () => {
		console.log(formik.values);
		await loginUser(formik.values);
	};

	useEffect(() => {
		if (data) {
			if (data.id) {
				enqueueSnackbar("Login Successfully", { variant: "success" });
				dispatch(setUser(data));
				if (data.position == "user") {
					navigate("/");
				} else navigate("/admin");
			} else {
				enqueueSnackbar("Wrong input email or password", {
					variant: "warning",
					preventDuplicate: true,
				});

				console.log(data.error);
			}
		}
	}, [data]);

	return (
		<Box height="100vh">
			<Box
				sx={{
					background: `url("/images/login-bg.png") center center / cover no-repeat`,
					height: "100%",
					position: "relative",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					"&::before": {
						content: '""',
						display: "block",
						width: "100%",
						backgroundColor: "rgba(7,6,29,0.05)",
						top: 0,
						left: 0,
						zIndex: 1,
						height: "100%",
						position: "absolute",
					},
				}}
			>
				<Box
					sx={{
						zIndex: 1,
						ml: { xs: 0, md: 40, lg: "30%", xl: "50%" },
						width: { xs: "95%", sm: 500 },
					}}
				>
					<Paper sx={{ p: 4 }}>
						<Typography variant="h6" sx={{ mb: 2 }}>
							Login to your Account
						</Typography>
						<Box component="form" sx={{ width: "100%" }}>
							<TextField
								label="email"
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								fullWidth
							/>
							<TextField
								sx={{ mt: 2 }}
								type="password"
								label="password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								fullWidth
							/>
							<Box
								sx={{
									display: "flex",
									mt: 1,
									flexDirection: { xs: "column", md: "row" },
									justifyContent: "space-between",
								}}
							>
								<Button
									variant="contained"
									sx={{ width: { xs: "100%", md: 100 } }}
									onClick={onSubmit}
								>
									Login
								</Button>
								<Typography>
									Not registered?{" "}
									<Box
										component={Link}
										to="/sign-up"
										sx={{
											textDecoration: "none",
											color: theme.palette.secondary.main,
										}}
									>
										Create an account
									</Box>
								</Typography>
							</Box>
						</Box>
					</Paper>
				</Box>
			</Box>
		</Box>
	);
}

export default Login;
