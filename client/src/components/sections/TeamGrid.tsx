import { useTranslation } from "react-i18next";
import { LEAD_ID, dentists, hygieneTeam, type TeamMember } from "@/data/team";
import { pick } from "@/lib/locale";
import { HashLink } from "@/components/layout/HashLink";

function MemberCard({ member, prefix, lang }: { member: TeamMember; prefix: string; lang: string }) {
  return (
    <li>
      <HashLink
        className={`team-member${member.id === LEAD_ID ? " team-member--lead" : ""}`}
        to={`${prefix}${member.id}`}
      >
        <img className="team-member__photo" src={member.photo} alt="" width={320} height={400} />
        <p className="team-member__role">{pick(member.role, lang)}</p>
        <h3 className="team-member__name">{member.name}</h3>
        {member.spec.pl ? <p className="team-member__spec">{pick(member.spec, lang)}</p> : null}
      </HashLink>
    </li>
  );
}

export function TeamGrid({ prefix = "#zespol/", showHygiene = false }: { prefix?: string; showHygiene?: boolean }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="team-groups">
      <ul className="team-grid">
        {dentists.map((m) => (
          <MemberCard key={m.id} member={m} prefix={prefix} lang={lang} />
        ))}
      </ul>
      {showHygiene && hygieneTeam.length > 0 ? (
        <div className="team-group">
          <h2 className="team-group__title">{t("teamPage.hygieneTitle")}</h2>
          <ul className="team-grid">
            {hygieneTeam.map((m) => (
              <MemberCard key={m.id} member={m} prefix={prefix} lang={lang} />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
