export const getLaunchBy = async ({ id }) => {
  const res = await fetch(`http://localhost:3000/exerciseBasic/${id}`);

  const launch = await res.json();

  return launch;
};
