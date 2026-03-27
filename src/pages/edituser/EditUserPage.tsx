import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import SuccessModal from "../../components/modal/SuccessModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useUser } from "../../features/queries";
import { useUsersStore } from "../../features/store";
import { usersApi } from "../../features/api";
import { userFormSchema, type UserFormData } from "../../hooks/useForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../edituser/edituser.scss";

export default function EditUserPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const { data: user, isLoading } = useUser(userId ? Number(userId) : null);
  const { updateUser } = useUsersStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      city: "",
      phone: "",
      companyName: "",
    },
  });

  // Заполняем форму данными пользователя при загрузке
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.address.city,
        phone: user.phone.replace(/\D/g, ""), // только цифры
        companyName: user.company.name,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UserFormData) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      name: data.name,
      username: data.username,
      email: data.email,
      address: { ...user.address, city: data.city },
      phone: data.phone,
      company: { ...user.company, name: data.companyName },
    };

    try {
      await usersApi.updateUser(updatedUser);
      updateUser(updatedUser);

      setShowSuccess(true);

      // Через 4 секунды или после закрытия модалки возвращаемся на главную
      setTimeout(() => {
        navigate("/");
      }, 4500);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Ошибка при сохранении изменений");
    }
  };

  if (isLoading)
    return <div className="loading">Загрузка данных пользователя...</div>;
  if (!user) return <div className="error">Пользователь не найден</div>;

  return (
    <div className="edit-page">
      <button type="button" onClick={() => navigate("/")} className="back-btn">
        <ArrowBackIcon />
        Назад
      </button>

      <div className="profile-layout">
        <div className="profile-avatar-section">
          <div className="avatar-container">
            <div className="avatar"></div>
          </div>
          <p className="avatar-caption1">Данные профиля</p>
          <p className="avatar-caption">Рабочее пространство</p>
          <p className="avatar-caption">Приватность</p>
          <p className="avatar-caption">Безопасность</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
          <div className="form-group">
            <h1>Данные профиля</h1>

            <label>Имя</label>
            <input {...register("name")} />
            {errors.name && (
              <span className="error">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Никнейм</label>
            <input {...register("username")} />
            {errors.username && (
              <span className="error">{errors.username.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Почта</label>
            <input type="email" {...register("email")} />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Город</label>
            <input {...register("city")} />
            {errors.city && (
              <span className="error">{errors.city.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Телефон</label>
            <input {...register("phone")} maxLength={15} />
            {errors.phone && (
              <span className="error">{errors.phone.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Название компании</label>
            <input {...register("companyName")} />
            {errors.companyName && (
              <span className="error">{errors.companyName.message}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" disabled={isSubmitting} className="save-btn">
              {isSubmitting ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </form>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}
