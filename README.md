# CityViews

**Benchmarking Satellite and Street-Level Imagery in Urban Vision-Language Models**
GAIA Workshop @ ECCV 2026 — Malmö, 8–12 September 2026

**Project page → https://ezellm.github.io/cityviews/**

Alperen Demirci<sup>1,\*</sup>, Ezel Bayraktar<sup>1,\*</sup>, Mukhamediyar Amanzhol<sup>1</sup>,
Adam Sattout<sup>1</sup>, Erkut Erdem<sup>1</sup>, Aykut Erdem<sup>2</sup>
<sup>1</sup>Hacettepe University · <sup>2</sup>Koç University · <sup>\*</sup>equal contribution

---

Pairing satellite and street-level imagery is widely assumed to improve urban
vision-language models, but aggregate benchmarks rarely reveal *when* the second
view actually helps. CityViews is an OpenStreetMap-grounded benchmark that measures
this marginal value directly: 40 cities, 12 tasks, 34,484 questions, every one asked
three ways — satellite only, street only, both — from which we read **fusion synergy**,
the gain of both views over the better single view.

| Regime | Tasks | Synergy (CityViews-9B-SU) |
|---|---|---|
| Urban attribute | 7 | **+1.6** points |
| Cross-view correspondence | 5 | **+46.6** points |

Same model, same questions, same protocol. Whether a second view helps is a property
of the task, not of the model.

## What is in this repository

| Path | Contents |
|---|---|
| `index.html`, `assets/css`, `assets/js` | The project page (plain HTML/CSS/JS, no build step). |
| `assets/pdf/` | Camera-ready paper and the 140 × 100 cm poster. |
| `assets/img/` | Figures, task gallery images, logos. |

The benchmark data and the generation code are being prepared for release and will
be hosted here.

## Citation

```bibtex
@inproceedings{demirci2026cityviews,
  title     = {CityViews: Benchmarking Satellite and Street-Level Imagery
               in Urban Vision-Language Models},
  author    = {Demirci, Alperen and Bayraktar, Ezel and Amanzhol, Mukhamediyar
               and Sattout, Adam and Erdem, Erkut and Erdem, Aykut},
  booktitle = {Proceedings of the European Conference on Computer Vision (ECCV)
               Workshops},
  year      = {2026}
}
```

## Attribution

Map data © OpenStreetMap contributors, Open Database License. Street-level imagery
© Google. Satellite and aerial imagery © Esri and its data providers, USDA (NAIP)
and IGN.
