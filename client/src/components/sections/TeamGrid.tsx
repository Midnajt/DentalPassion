import { useTranslation } from "react-i18next";
import { teamSorted } from "@/data/team";
import { pick } from "@/lib/locale";
import { HashLink } from "@/components/layout/HashLink";

export function TeamGrid({ prefix = "#zespol/" }: { prefix?: string }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <ul className="team-grid">
      {teamSorted.map((m) => (
        <li key={m.id}>
          <HashLink className="team-member" to={`${prefix}${m.id}`}>
            <img className="team-member__photo" src={m.photo} alt="" width={320} height={400} />
            <p className="team-member__role">{pick(m.role, lang)}</p>
            <h3 className="team-member__name">{m.name}</h3>
            {m.spec.pl ? <p className="team-member__spec">{pick(m.spec, lang)}</p> : null}
          </HashLink>
        </li>
      ))}
    </ul>
  );
}
