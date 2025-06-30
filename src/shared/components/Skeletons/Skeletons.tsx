import styles from './Skeletons.module.css';

export default function Skeletons() {
  return (
    <div className={styles.skeletonContainer}>
      {/* Weather Section Skeleton */}
      <section className={styles.weatherSkeleton}>
        {/* General Data Skeleton */}
        <article className={styles.generalDataSkeleton}>
          <div className={styles.weatherIconSkeleton}>
            <div className={styles.iconPlaceholder}></div>
            <div className={styles.iconGlowSkeleton}></div>
          </div>

          <div className={styles.weatherContentSkeleton}>
            <div className={styles.descriptionSkeleton}></div>

            <div className={styles.jokeContainerSkeleton}>
              <div className={styles.jokeIconSkeleton}></div>
              <div className={styles.jokeTextSkeleton}>
                <div className={styles.jokeLine}></div>
                <div className={styles.jokeLine}></div>
              </div>
            </div>
          </div>

          <div className={styles.decorativeElementsSkeleton}>
            <div className={styles.sparkleSkeleton}></div>
            <div className={styles.sparkleSkeleton}></div>
            <div className={styles.sparkleSkeleton}></div>
          </div>
        </article>

        {/* Temperature Block Skeleton */}
        <article className={styles.temperatureBlockSkeleton}>
          <div className={styles.cityNameSkeleton}></div>
          <div className={styles.temperatureContainerSkeleton}>
            <div className={styles.currentTempSkeleton}></div>
            <div className={styles.minMaxTempSkeleton}>
              <div className={styles.minTempSkeleton}></div>
              <div className={styles.maxTempSkeleton}></div>
            </div>
          </div>
        </article>

        {/* Two Weather Items Skeleton */}
        <div className={styles.twoWeatherItemsSkeleton}>
          <article className={styles.weatherItemSkeleton}>
            <div className={styles.weatherItemHeaderSkeleton}>
              <div className={styles.iconSkeleton}></div>
              <div className={styles.headerTextSkeleton}></div>
            </div>
            <div className={styles.weatherValueSkeleton}></div>
            <div className={styles.weatherDescSkeleton}></div>
          </article>

          <article className={styles.weatherItemSkeleton}>
            <div className={styles.weatherItemHeaderSkeleton}>
              <div className={styles.iconSkeleton}></div>
              <div className={styles.headerTextSkeleton}></div>
            </div>
            <div className={styles.weatherValueSkeleton}></div>
            <div className={styles.weatherDescSkeleton}></div>
          </article>
        </div>

        {/* Wind Block Skeleton */}
        <article className={styles.windBlockSkeleton}>
          <div className={styles.weatherItemHeaderSkeleton}>
            <div className={styles.iconSkeleton}></div>
            <div className={styles.headerTextSkeleton}></div>
          </div>
          <div className={styles.windContainerSkeleton}>
            <div className={styles.windParamsSkeleton}>
              <div className={styles.windParamSkeleton}>
                <div className={styles.windLabelSkeleton}></div>
                <div className={styles.windValueSkeleton}></div>
              </div>
              <div className={styles.windDividerSkeleton}></div>
              <div className={styles.windParamSkeleton}>
                <div className={styles.windLabelSkeleton}></div>
                <div className={styles.windValueSkeleton}></div>
              </div>
            </div>
            <div className={styles.windCompassSkeleton}>
              <div className={styles.compassCircleSkeleton}></div>
              <div className={styles.compassTicksSkeleton}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={styles.tickSkeleton}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* Form Section Skeleton
      <section className={styles.formContainerSkeleton}>
        <div className={styles.titleSkeleton}></div>
        <div className={styles.subtitleSkeleton}></div>

        <div className={styles.formSkeleton}>
          <div className={styles.inputSkeleton}></div>
          <div className={styles.buttonContainerSkeleton}>
            <div className={styles.submitButtonSkeleton}></div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
