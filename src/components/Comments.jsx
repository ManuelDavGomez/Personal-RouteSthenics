import Safe from "react-safe";
import "../style/pageGeneral.css";

const Comments = () => {
  return (
    <section className="comments_general">
      <section className="comments">
        <div id="disqus_thread"></div>

        <Safe.script>
          {(function () {
            // DON'T EDIT BELOW THIS LINE
            var d = document,
              s = d.createElement("script");
            s.src = "https://routesthenics.disqus.com/embed.js";
            s.setAttribute("data-timestamp", +new Date());
            (d.head || d.body).appendChild(s);
          })()}
        </Safe.script>
      </section>
    </section>
  );
};

export default Comments;
