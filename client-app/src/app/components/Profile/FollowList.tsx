export default function FollowList({ followings }) {
  return (
    <div className="bg-transparent">
      <div className="mx-auto text-center ">
        <div className="space-y-8 sm:space-y-12">
          <ul role="list" className="flex px-4 pt-3 space-x-3">
            {followings.map((person) => (
              <li key={person.name} className="list-none">
                <img
                  className="w-16 h-16 mx-auto rounded-lg"
                  src={person.image}
                  alt=""
                />

                <div className="pt-2 text-xs font-medium lg:text-sm">
                  <h3>{person.displayName}</h3>
                  <p className="text-indigo-600">{person.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
