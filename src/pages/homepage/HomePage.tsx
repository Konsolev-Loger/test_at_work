import { useEffect } from "react";
import { useUsers } from "../../features/queries";
import { useUsersStore } from "../../features/store";
import "../../pages/homepage/HomePage.scss";
import UserCard from "../../components/usercard/UserCard";

export default function HomePage() {
  const { data: allUsers = [], isLoading, error } = useUsers();

  const { activeUsers, archivedUsers, hiddenIds, setActiveUsers } =
    useUsersStore();

  // При первой загрузке берём только первых 6 пользователей
  useEffect(() => {
    if (allUsers.length > 0 && activeUsers.length === 0) {
      const firstSix = allUsers.slice(0, 6).map((user) => ({
        ...user,
        avatar: `./brainFix.jpg`,
      }));
      setActiveUsers(firstSix);
    }
  }, [allUsers, activeUsers.length, setActiveUsers]); //следим за данными, пустой ли текущий список, и функция из стора

  // Фильтруем скрытых пользователей, что бы не мутировать стейт
  const visibleActive = activeUsers.filter((u) => !hiddenIds.includes(u.id));

  if (isLoading)
    return <div className="loading">Загрузка пользователей...</div>;
  if (error) return <div className="error">Ошибка при загрузке данных</div>;

  return (
    <div className="home-page">
      <div className="container">
        <h1 className="title">Активные</h1>

        <div className="users-grid">
          {visibleActive.length > 0 ? (
            visibleActive.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <p className="empty">Нет активных пользователей</p>
          )}
        </div>

        {archivedUsers.length > 0 && (
          <>
            <h2 className="title archive-title">Архив</h2>

            <div className="users-grid archive">
              {archivedUsers.map((user) => (
                <UserCard key={user.id} user={user} isArchived />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
