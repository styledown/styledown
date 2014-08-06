Updating versions
-----------------

    # there will be references to old versions in docs,
    # (eg, styledown/v0.3.0) and these should be updated.

      perl -p -i -e "s#styledown/v0.4.0/#styledown/v0.4.0/#g" *.md examples/*/*

    # release

      bump package.json
      vim History.md
      git release v0.4.0
      npm publish
