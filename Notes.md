Updating versions
-----------------

    # there will be references to old versions in docs,
    # (eg, styledown/v0.4.0) and these should be updated.

      git grep "styledown/v"

    # bump them

      perl -p -i -e "s/v0.4.0/v0.5.0/g" *.md examples/*/*

    # release

      bump package.json
      vim History.md
      git release v0.5.0
      npm publish
