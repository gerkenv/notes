# Grafana

## Variables
https://grafana.com/docs/grafana/v7.5/variables/syntax/
https://grafana.com/docs/grafana/v7.5/variables/advanced-variable-format-options/

### play pages
https://play.grafana.org/d/cJtIfcWiz/template-variable-formatting-options?orgId=1

https://play.grafana.org/d/000000056/templated-dynamic-dashboard?orgId=1&var-app=backend&var-server=backend_03&var-server=backend_04&var-interval=1h

## Repeating

### Repeat Queries / Graph In The Same Panel
1. Create a variable `A`. Use `multi-value` variable. Optionally set `include-all` option.
2. Use `kairosdb` query and set the variable `A` in the query in desired place.
3. Switch to a new set of values for variable `A` -> profit.

### How To Repeat Panels
https://grafana.com/blog/2020/06/09/learn-grafana-how-to-automatically-repeat-rows-and-panels-in-dynamic-dashboards/

1. Create a variable `A`. Use `multi-value` variable. Optionally set `include-all` option.
1. Use `kairosdb` query and set the variable `A` in the query in desired place.
1. Go to panel edit mode -> panel general settings -> repeating -> select the variable `A`
1. leave panel -> switch variable to new set of values -> profit

### How To Repeat Rows

1. Create a variable `A`. Use `multi-value` variable. Optionally set `include-all` option.
1. Use `kairosdb` query and set the variable `A` in the query in desired place.
1. Go to the row settings -> in `repeat for` select the variable `A`
1. leave panel -> switch variable to new set of values -> profit
