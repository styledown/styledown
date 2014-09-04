Updating versions
-----------------

    # there will be references to old versions in docs.
    # update them.

      perl -p -i -e "s#styledown/v[^/]+/#styledown/v1.0.0/#g" Readme.md docs/*.md

    # release

      bump package.json
      vim History.md
      npm test && npm publish
      git release v1.0.0
